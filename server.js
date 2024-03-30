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
        const { chainid } = req.body;
        const newHC = await pool.query("INSERT INTO Hotel_Chain (ChainID) VALUES($1)",
        [chainid]
        );
        res.json(newHC.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})

// Get all Hotel Chains
app.get("/Hotel_Chain", async(req, res) => {
    try {
        const allHC = await pool.query("SELECT * FROM Hotel_Chain");
        res.json(allHC.rows);
    } catch (error) {
        console.error(error.message);
    }
})


app.listen(port, () => console.log(`Server started on port ${port}`));