import React from 'react';
import Navbar from "./components/NavBar/navbar";
import LoginSignup from "./components/LoginSignup/loginsignup";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/login" element={<LoginSignup />} />
          {/* Define other routes and their elements here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
