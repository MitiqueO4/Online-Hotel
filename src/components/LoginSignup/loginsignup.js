import React, { useState } from 'react';
import './loginsignup.css';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';

const LoginSignup = () => {
    const[action,setAction] = useState("Sign Up");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Function to handle login action
    const handleLogin = async () => {
        try {
            const response = await fetch("/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                console.error(`HTTP Error: ${response.status}`);
                const text = await response.text();
                console.error(`Response Text: ${text}`);
                throw new Error('Failed to fetch');
            }
    
            const responseData = await response.json();
            const { message, redirectTo } = responseData;
    
            console.log(message); // Log the login message
            
            // Redirect based on the response
            if (redirectTo) {
                window.location.href = redirectTo;
            }
        } catch (error) {
            console.error('Login error:', error.message);
            setError(error.message);
        }
    }

    const handleSignUp = async () => {
        window.location.href = "/customercreationform";
    } 

  return (
    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
        <div className="input">
            <img src={email_icon} alt=''/>
            <input type='email' placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="input">
            <img src={password_icon} alt=''/>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        </div>
        {action==="Sign Up"?<div></div>:  <div className='forgot-password'>Forgot Password? <span>Click Here</span></div> } 
        <div className='submit-container'>
            <div className={action==="Login"?"submit gray": "submit"} onClick={handleSignUp}>Sign Up</div>
            <div className={action==="Sign Up" ? "submit gray" : "submit"} onClick={handleLogin}>Login</div>
            </div>  
    </div>
  )
}

export default LoginSignup;
