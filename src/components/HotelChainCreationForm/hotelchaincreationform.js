import React, { useState } from 'react';
import axios from 'axios';

const HotelChainCreationForm = () => {
  const [chainID, setChainID] = useState(0);
  const [address, setAddress] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState(0);
  const [emails, setEmails] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/Hotel_Chain", {
        chainID,
        address,
        phoneNumbers,
        emails
      });

      console.log(response.data); // Log the response data

      alert('Hotel chain created successfully!');
      setChainID(0);
      setAddress('');
      setPhoneNumbers(0);
      setEmails('');
    } catch (error) {
      console.error('Hotel chain creation error:', error.message);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Hotel Chain</h2>
      <label>
        ChainID:
        <input type="number" value={chainID} onChange={(e) => setChainID(parseInt(e.target.value))} />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <label>
        Phone Numbers:
        <input type="number" value={phoneNumbers} onChange={(e) => setPhoneNumbers(parseInt(e.target.value))} />
      </label>
      <label>
        Emails:
        <input type="text" value={emails} onChange={(e) => setEmails(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default HotelChainCreationForm