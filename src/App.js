import React from 'react';
import Navbar from "./components/NavBar/navbar";
import LoginSignup from "./components/LoginSignup/loginsignup";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes> 
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/login" element={<LoginSignup />} />
          {/* Define other routes and their elements here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
