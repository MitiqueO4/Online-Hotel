import React, { useState } from 'react';
import axios from 'axios';

const CustomerCreationForm = () => {
  const [customerID, setCustomerID] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfReg, setDateOfReg] = useState('');
  const [idType, setIDType] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/customers', { customerID, password, dateOfReg, idType, name, address });
      alert('Customer created successfully!');

      // Reset form fields
      setCustomerID('');
      setPassword('');
      setDateOfReg('');
      setIDType('');
      setName('');
      setAddress('');

      window.location.href = "/hotellist";

    } catch (error) {
      console.error('Failed to create customer:', error);
      alert('Failed to create customer');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Customer</h2>
      <input type="text" value={customerID} onChange={(e) => setCustomerID(e.target.value)} placeholder="Customer ID" required />
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input type="date" value={dateOfReg} onChange={(e) => setDateOfReg(e.target.value)} placeholder="Date of Registration" required />
      <select value={idType} onChange={(e) => setIDType(e.target.value)} required>
        <option value="">Select ID Type</option>
        <option value="Driver's License">Driver's License</option>
        <option value="Passport">Passport</option>
        <option value="Health Card">Health Card</option>
      </select>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerCreationForm;