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
                <Link to="/hotelcreationform">Add Hotel</Link>
              </li>
              <li>
                <Link to="/roomcreationform">Add Room</Link>
              </li>
              <li>
                <Link to="/hotelratingform">Rate Hotel</Link>
              </li>
              <li>
                <Link to="/employeecreationform">Add Employee</Link>
              </li>
            </ul>
          </nav>        
        </div>
    );
  };
  
export default Manager;