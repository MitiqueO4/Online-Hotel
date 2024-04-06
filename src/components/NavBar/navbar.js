import React from 'react';
import './navbar.css';
import logo from '../../assets/hotel-3.png';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="desktopMenu">
        <Link to="home" smooth={true} duration={1000} className="desktopMenuListItem">Home</Link>
        <Link to="about" smooth={true} duration={1000} className="desktopMenuListItem">About</Link>
        <Link to="/hotellist" smooth={true} duration={1000} className="desktopMenuListItem">Hotels</Link>
      </div>
      <Link to="/login" className='desktopMenuBtn'>Log in</Link>
    </nav>
  )
}

export default Navbar;


