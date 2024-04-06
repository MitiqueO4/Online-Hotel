import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeCreationForm = () => {
  const [empID, setEmpID] = useState('');
  const [hotelID, setHotelID] = useState('');
  const [manager, setManager] = useState('');
  const [sin, setSIN] = useState('');
  const [roles, setRoles] = useState('');
  const [hotels, setHotels] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate SIN here (validation logic not implemented)
    try {
      await axios.post('/employee', { empID, hotelID, manager, sin, roles });
      alert('Employee created successfully!');
      // Reset form fields
      setEmpID('');
      setHotelID('');
      setManager('');
      setSIN('');
      setRoles('');
    } catch (error) {
      console.error('Failed to create employee:', error);
      alert('Failed to create employee');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Employee</h2>
      <input type="number" value={empID} onChange={(e) => setEmpID(e.target.value)} placeholder="Employee ID" required />
      <select value={hotelID} onChange={(e) => setHotelID(e.target.value)} required>
        <option value="">Select Hotel ID</option>
        {hotels.map((hotel) => (
          <option key={hotel.hotel_id} value={hotel.hotel_id}>
            {hotel.hotel_id}
          </option>
        ))}
      </select>
      <input type="text" value={manager} onChange={(e) => setManager(e.target.value)} placeholder="Manager" />
      <input type="text" value={sin} onChange={(e) => setSIN(e.target.value)} placeholder="SIN" required />
      <input type="text" value={roles} onChange={(e) => setRoles(e.target.value)} placeholder="Roles" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmployeeCreationForm;