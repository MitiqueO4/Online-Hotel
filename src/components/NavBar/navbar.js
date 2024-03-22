import React from 'react';
import './navbar.css';
import logo from '../../assets/hotel-2.png';
import { Link } from 'react-scroll'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="desktopMenu">
        {/* Correct usage of className and properly closed Link tags */}
        <Link to="home" smooth={true} duration={1000} className="desktopMenuListItem">Home</Link>
        <Link to="clients" smooth={true} duration={1000} className="desktopMenuListItem">Clients</Link>
        <Link to="about" smooth={true} duration={1000} className="desktopMenuListItem">About</Link>
        <Link to="hotels" smooth={true} duration={1000} className="desktopMenuListItem">Hotels</Link>
      </div>
      <button className='desktopMenuBookBtn bn36'>Book Now</button>
    </nav>
  )
}

export default Navbar;


