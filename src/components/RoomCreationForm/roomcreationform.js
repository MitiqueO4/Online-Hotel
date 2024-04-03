import React, { useState } from 'react';
import axios from 'axios';

const RoomCreationForm = ({ hotelId }) => {
  const [price, setPrice] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [capacity, setCapacity] = useState('');
  const [view, setView] = useState('');
  const [extendable, setExtendable] = useState(false);
  const [damages, setDamages] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/hotels/${hotelId}/rooms`, {
        price: parseFloat(price),
        amenities,
        capacity,
        view,
        extendable,
        damages
      });
      alert('Room added successfully!');
      // Reset form
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
        {/* Add more amenities as needed */}
      </div>
      <input
        type="text"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        placeholder="Capacity (e.g., Single, Double)"
        required
      />
      <select value={view} onChange={(e) => setView(e.target.value)} required>
        <option value="">Select View</option>
        <option value="Sea View">Sea View</option>
        <option value="Mountain View">Mountain View</option>
        {/* Add more views as needed */}
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
