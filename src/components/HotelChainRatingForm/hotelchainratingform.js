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
        const response = await axios.get('/Hotel_Chain');
        console.log(response.data); // Check if the correct data is fetched
        setChains(response.data);
        if (response.data.length > 0) {
          setChainId(response.data[0].chain_id);
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
      await axios.post('/Hotel_Rate', { chainId, rating, comment });
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
          {chains.map((chain) => {
            console.log("Chain:", chain.chain_id); // Add this line to debug
            return (
              <option key={chain.chain_id} value={chain.chain_id}> 
                {chain.chain_id}
              </option>
            );
          })}
        </select>
      </label>
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
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
