import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from '../DatePopUp/datepopup';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState();
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sortOption, setSortOption] = useState('');

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
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleRoomBooking = (roomId) => {
    setSelectedRoomId(roomId);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmitBooking = (startDate, endDate) => {
    console.log('Room ID:', selectedRoomId);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    setIsPopupOpen(false);
    // You can send the booking details to the backend here
  };

  useEffect(() => {
    if (sortOption) {
      sortRooms(sortOption);
    }
  }, [sortOption, rooms]);

  const sortRooms = (option) => {
    if (option === 'priceLowToHigh') {
      setRooms([...rooms].sort((a, b) => a.price - b.price));
    } else if (option === 'capacity') {
      setRooms([...rooms].sort((a, b) => {
        if (a.capacity < b.capacity) return -1;
        if (a.capacity > b.capacity) return 1;
        return 0;
      }));
    } else if (option === 'view') {
      setRooms([...rooms].sort((a, b) => {
        if (a.view_type === 'Mountain View' && b.view_type === 'Sea View') return -1;
        if (a.view_type === 'Sea View' && b.view_type === 'Mountain View') return 1;
        return 0;
      }));
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
      <div>
        <label>Sort by:</label>
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Choose</option>
          <option value="priceLowToHigh">Price Low to High</option>
          <option value="capacity">Capacity</option>
          <option value="view">View</option>
        </select>
      </div>
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
      {isPopupOpen && (
        <Popup onSubmit={handleSubmitBooking} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default HotelList;