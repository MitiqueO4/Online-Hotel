import React, { useState } from 'react';
import axios from 'axios';

const HotelChainCreationForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/hotel-chains', { name, description });
      alert('Hotel chain created successfully!');
      setName('');
      setDescription('');
    } catch (error) {
      alert('Failed to create hotel chain');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Hotel Chain</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
