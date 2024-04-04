import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('/hotels'); // Adjust this URL to match your API endpoint
        setHotels(response.data); // Assuming the API returns an array of hotels
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div>
      <h2>Hotels</h2>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>
            <h3>{hotel.name}</h3>
            <p>Address: {hotel.address}</p>
            <p>Contact Email: {hotel.contactEmail}</p>
            <p>Contact Phone: {hotel.contactPhone}</p>
            {/* Display more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;