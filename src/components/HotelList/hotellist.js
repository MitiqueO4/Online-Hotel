import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch the list of hotels
    const fetchHotels = async () => {
      try {
        const hotelResponse = await axios.get('/hotels');
        setHotels(hotelResponse.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    
    fetchHotels();
  }, []);

  const handleHotelChange = async (event) => {
    const hotelId = event.target.value;
    setSelectedHotelId(hotelId);
    try {
      const response = await axios.post('/rooms', { hotelId });
      setRooms(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleRoomBooking = async(e) => {
    try {
      return
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Hotels</h2>
      <select onChange={handleHotelChange}>
        <option value="">Select a hotel</option>
        {hotels.map((hotel) => (
          <option key={hotel.hotel_id} value={hotel.hotel_id}>
            {hotel.hotel_id}
          </option>
        ))}
      </select>
      {selectedHotelId && (
        <div>
          <h3>Rooms in Hotel</h3>
          <ul>
            {rooms.map((room) => (
              <li key={room.room_id}>
                {/* Display room details */}
                <span>Room: {room.room_id} <br />
                - Price: ${room.price} <br />
                - Capacity: {room.capacity} <br />
                - View: {room.view_type} <br />
                - Is Extendable: {room.is_extendable ? 'Yes' : 'No'} <br />
                - Amenities: {room.amenities} <br />
                - Problems: {room.problems} <br />
                <button onClick={() => handleRoomBooking(room.room_id)}>Book Room</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HotelList;