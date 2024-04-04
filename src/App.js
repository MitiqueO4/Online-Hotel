import React from 'react';
import Navbar from "./components/NavBar/navbar";
import LoginSignup from "./components/LoginSignup/loginsignup";
import Manager from "./components/Manager/manager";
import HotelChainCreationForm from './components/HotelChainCreationForm/hotelchaincreationform'; 
import HotelChainRatingForm from './components/HotelChainRatingForm/hotelchainratingform';
import HotelCreationForm from './components/HotelCreationForm/hotelcreationform'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes> 
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/hotelchaincreationform" element={<HotelChainCreationForm />} />
          <Route path="/hotelcreationform" element={<HotelChainRatingForm />} />
          <Route path="/hotelchainratingform" element={<HotelCreationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
