import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomCreationForm = () => {
  const [hotelID, setHotelID] = useState('');
  const [hotels, setHotels] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [price, setPrice] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [capacity, setCapacity] = useState('');
  const [view, setView] = useState('');
  const [extendable, setExtendable] = useState(false);
  const [damages, setDamages] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('/Hotel');
        console.log(response.data); // Check if the correct data is fetched
        setHotels(response.data);
        if (response.data.length > 0) {
          setHotelID(response.data[0].hotel_id);
        }
      } catch (error) {
        console.error('Failed to fetch hotel chains:', error);
      }
    };

    fetchHotels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/room', {
        hotelID,
        roomId: parseInt(roomId),
        price: parseFloat(price),
        amenities,
        capacity,
        view,
        extendable,
        damages
      });
      alert('Room added successfully!');
      // Reset form
      setRoomId('');
      setPrice('');
      setAmenities([]);
      setCapacity('');
      setView('');
      setExtendable(false);
      setDamages('');
    } catch (error) {
      console.error('Failed to add room:', error);
      alert('Failed to add room');
    }
  };

  const handleAmenitiesChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAmenities([...amenities, value]);
    } else {
      setAmenities(amenities.filter((amenity) => amenity !== value));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Room</h2>
      <label>
        Select Hotel:
        <select value={hotelID} onChange={(e) => setHotelID(e.target.value)}>
          {hotels.map((hotel) => {
            return (
              <option key={hotel.hotel_id} value={hotel.hotel_id}> 
                {hotel.hotel_id}
              </option>
            );
          })}
        </select>
      </label>
      <input
        type="number"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Room ID"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <div>
        Amenities:
        <label><input type="checkbox" value="TV" onChange={handleAmenitiesChange} /> TV</label>
        <label><input type="checkbox" value="Air Condition" onChange={handleAmenitiesChange} /> Air Condition</label>
        <label><input type="checkbox" value="Fridge" onChange={handleAmenitiesChange} /> Fridge</label>
      </div>
      <select
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        required
      >
        <option value="">Select Capacity</option>
        <option value="Single">Single</option>
        <option value="Double">Double</option>
        <option value="Suite">Suite</option>
      </select>
      <select value={view} onChange={(e) => setView(e.target.value)} required>
        <option value="">Select View</option>
        <option value="Sea View">Sea View</option>
        <option value="Mountain View">Mountain View</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={extendable}
          onChange={(e) => setExtendable(e.target.checked)}
        />
        Extendable
      </label>
      <textarea
        value={damages}
        onChange={(e) => setDamages(e.target.value)}
        placeholder="Damages (if any)"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RoomCreationForm;