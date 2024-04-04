import React, { useState } from 'react';
import axios from 'axios';

const HotelCreationForm = () => {
  const [chainID, setChainID] = useState();
  const [hotelID, setHotelID] = useState('');
  const [address, setAddress] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [numberOfRooms, setNumberOfRooms] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/Hotel", {
        chainID,
        hotelID,
        address,
        contactEmail,
        contactPhone,
        numberOfRooms: parseInt(numberOfRooms, 10)
      });

      console.log(response.data); // Log the response data

      alert('Hotel added successfully!');
      // Reset form
      setChainID('');
      setHotelID('');
      setAddress('');
      setContactEmail('');
      setContactPhone('');
      setNumberOfRooms('');
    } catch (error) {
      console.error('Failed to add hotel:', error);
      alert('Failed to add hotel');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Hotel</h2>
      <input
        type="number"
        value={chainID}
        onChange={(e) => setChainID(e.target.value)}
        placeholder="Hotel Chain ID"
        required
      />
      <input
        type="number"
        value={hotelID}
        onChange={(e) => setHotelID(e.target.value)}
        placeholder="Hotel ID"
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
      />
      <input
        type="email"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
        placeholder="Contact Email"
        required
      />
      <input
        type="text"
        value={contactPhone}
        onChange={(e) => setContactPhone(e.target.value)}
        placeholder="Contact Phone"
        required
      />
      <input
        type="number"
        value={numberOfRooms}
        onChange={(e) => setNumberOfRooms(e.target.value)}
        placeholder="Number of Rooms"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default HotelCreationForm;
