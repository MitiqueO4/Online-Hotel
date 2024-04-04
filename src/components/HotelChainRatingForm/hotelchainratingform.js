import React, { useState } from 'react';
import axios from 'axios';

const HotelChainRatingForm = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const chainId = 'YOUR_CHAIN_ID'; // This should be dynamically selected

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

export default HotelChainRatingForm;
