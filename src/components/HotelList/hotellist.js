import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch the list of hotels
    const fetchHotels = async () => {
      try {
        const response = await axios.get('/hotels');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    
    fetchHotels();
  }, []);

  const handleHotelClick = async (hotelId) => {
    setSelectedHotelId(hotelId);
    try {
      const response = await axios.get(`/hotels/${hotelId}/rooms`);
      setRooms(response.data); // Assuming the API returns an array of rooms
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  return (
    <div>
      <h2>Hotels</h2>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id} onClick={() => handleHotelClick(hotel.id)}>
            <h3>{hotel.name}</h3>
            {/* More hotel details */}
          </li>
        ))}
      </ul>
      {selectedHotelId && (
        <div>
          <h3>Rooms in {hotels.find(hotel => hotel.id === selectedHotelId)?.name}</h3>
          <ul>
            {rooms.map((room) => (
              <li key={room.id}>
                {/* Display room details */}
                <span>Room: {room.number} - Price: ${room.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HotelList;