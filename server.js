const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db")
const port = 3000;


// MIDDLEWARE
app.use(cors());
app.use(express.json()); //req.body

// ROUTES

// Create Hotel_Chain
app.post("/Hotel_Chain", async(req, res) => {
    try {
        const { chainID, address, phoneNumbers, emails } = req.body;
        const newHC = await pool.query(
            "INSERT INTO Hotel_Chain (Chain_ID, Address, Phone_Numbers, Emails) VALUES($1, $2, ARRAY[$3::integer], ARRAY[$4]) RETURNING *",
            [chainID, address, phoneNumbers, emails]
        );
        res.json(newHC.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to create hotel chain" });
    }
});

// Create Hotel
app.post("/Hotel", async(req, res) => {
    try {
        const { chainID, hotelID, address, contactEmail, contactPhone, numberOfRooms } = req.body;
        const newHotel = await pool.query(
            "INSERT INTO Hotel (Chain_ID, hotel_id, Address, Emails, Phone_Numbers, Number_of_Rooms) VALUES($1, $2, $3, ARRAY[$4], ARRAY[$5], $6) RETURNING *",
            [chainID, hotelID, address, contactEmail, contactPhone, numberOfRooms]
        );
        res.json(newHotel.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to create hotel chain" });
    }
});

// Rate Hotel
app.post("/Hotel_Rate", async(req, res) => {
    try {
        const { chainId, rating } = req.body;
        const updateChain = await pool.query(
            "UPDATE hotel_chain SET rating = $1 WHERE chain_id = $2 RETURNING *",
            [rating, chainId]
        );
        console.log("Database response:", updateChain.rows[0]); // Log database response
        res.json(updateChain.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to create hotel chain" });
    }
});

// Get all Hotel Chains
app.get("/Hotel_Chain", async(req, res) => {
    try {
        const allHC = await pool.query("SELECT chain_id FROM Hotel_Chain");
        res.json(allHC.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// User Login
app.post("/login", async (req, res) => {
    try {
        console.log("Login route accessed.");
        const { email, password } = req.body;
        console.log(`Looking up user: ${email}`);

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        console.log(`User found: ${user.rows.length > 0}`);

        if (user.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare password
        const dbPassword = user.rows[0].password;
        console.log(`Comparing password for: ${email}`);

        const passwordMatch = password == dbPassword;

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Check if the user is a manager
        const isManager = user.rows[0].is_manager;
        console.log(`is manager: ${isManager}`);

        if (isManager) {
            // Redirect to manager URI if user is a manager
            return res.json({ message: "Manager login successful", redirectTo: "/manager" });
        } else {
            // Redirect to regular user URI if user is not a manager
            return res.json({ message: "Regular user login successful", redirectTo: "/employee" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred while logging in" });
    }
});


app.listen(port, () => console.log(`Server started on port ${port}`));