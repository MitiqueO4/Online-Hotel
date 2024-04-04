import React from "react";
import { Link } from "react-router-dom";
import './manager.css';

const Manager = () => {
    return (
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/hotelchaincreationform">Add Hotel Chain</Link>
              </li>
              <li>
                <Link to="/hotelchainratingform">Rate Hotel Chain</Link>
              </li>
              <li>
                <Link to="/hotelcreationform">Add Hotel</Link>
              </li>
            </ul>
          </nav>        
        </div>
    );
  };
  
export default Manager;