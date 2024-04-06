import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Popup({ onSubmit }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Please select start and end dates.");
      return;
    }
    alert("Booking room succcessful!")
    onSubmit(startDate, endDate);
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          required
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          required
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default Popup;