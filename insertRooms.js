const insertRooms = async () => {
    const roomData = [];

    // Generate room data for room_id 19-199 and hotel_id 5-40
    for (let roomId = 19; roomId <= 199; roomId++) {
        for (let hotelId = 5; hotelId <= 40; hotelId++) {
            const isExtendable = Math.random() < 0.5 ? 't' : 'f'; // Randomly true or false
            const viewTypeOptions = ['City View', 'Mountain View', 'Sea View'];
            const randomViewType = viewTypeOptions[Math.floor(Math.random() * viewTypeOptions.length)];
            const price = Math.floor(Math.random() * 3000) + 700; // Random price between 700 and 3699
            const amenitiesOptions = ['TV', 'Air Condition', 'Fridge', 'Microwave', 'WiFi', 'Coffee Maker'];
            const randomAmenities = [];
            const numAmenities = Math.floor(Math.random() * 4) + 1; // Random number of amenities between 1 and 4
            for (let i = 0; i < numAmenities; i++) {
                randomAmenities.push(amenitiesOptions[Math.floor(Math.random() * amenitiesOptions.length)]);
            }
            const problemsOptions = ['Leaking faucet', 'Broken TV remote', 'Clogged drain', 'Stained carpet', 'Noisy AC', 'None'];
            const randomProblem = problemsOptions[Math.floor(Math.random() * problemsOptions.length)];
            const capacityOptions = ['Single', 'Double', 'Suite'];
            const randomCapacity = capacityOptions[Math.floor(Math.random() * capacityOptions.length)];

            roomData.push(`(${roomId}, ${hotelId}, '${isExtendable}', '${randomViewType}', ${price}, '{"${randomAmenities.join('","')}"}', '${randomProblem}', '${randomCapacity}')`);
        }
    }

    // Divide the data into chunks to avoid exceeding the maximum parameter limit of a single query
    const chunkSize = 100;
    const chunks = [];
    for (let i = 0; i < roomData.length; i += chunkSize) {
        chunks.push(roomData.slice(i, i + chunkSize));
    }

    // Insert data chunks into the database
    for (const chunk of chunks) {
        const values = chunk.join(',');
        const query = `INSERT INTO room (room_id, hotel_id, is_extendable, view_type, price, amenities, problems, capacity) VALUES ${values}`;
        try {
            await pool.query(query);
            console.log(`Inserted ${chunk.length} rows`);
        } catch (error) {
            console.error('Error inserting rows:', error);
        }
    }
};

// Call the function to insert rooms
insertRooms();