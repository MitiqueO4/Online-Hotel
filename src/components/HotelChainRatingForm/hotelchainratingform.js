import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelRatingForm = () => {
  const [chainId, setChainId] = useState('');
  const [chains, setChains] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchChains = async () => {
      try {
        const response = await axios.get('/hotel-chains');
        setChains(response.data); // Assume the API returns an array of chain objects
        if (response.data.length > 0) {
          setChainId(response.data[0].id); // Automatically select the first chain
        }
      } catch (error) {
        console.error('Failed to fetch hotel chains:', error);
      }
    };

    fetchChains();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/hotel-chains/${chainId}/ratings`, { rating, comment });
      alert('Rating submitted successfully!');
      setRating(5);
      setComment('');
    } catch (error) {
      alert('Failed to submit rating');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rate Hotel Chain</h2>
      <label>
        Select Chain:
        <select value={chainId} onChange={(e) => setChainId(e.target.value)}>
          {chains.map((chain) => (
            <option key={chain.id} value={chain.id}>
              {chain.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Rating:
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default HotelRatingForm;
