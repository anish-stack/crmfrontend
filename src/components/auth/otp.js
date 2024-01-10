// Otp.js

import React, { useState } from 'react';
import {  toast } from 'react-toastify';

const Otp = () => {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the OTP and username to the backend API for activation (replace with your API endpoint)
      const response = await fetch("https://crmbackend-tawny.vercel.app/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, otp }),
      });

      if (response) {
        toast.success("Account activated successfully!");

        setTimeout(()=>{
            window.location="/"
        },3000)
        // Optionally, you can redirect the user to a login page or another page
      } else {
        const data = await response.json();
        toast.error(data.message || "Activation failed. Please check your OTP.");
      }
    } catch (error) {
      //console.error(error);
      toast.error("Activation failed. Please try again later.");
    }
  };

  return (
    <div className='containers'>
      <div className='otp-box'>
        <div className='heading'>
          OTP VERIFICATION
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>
          <button type="submit" className="activate-button">Activate</button>
        </form>
      </div>
    </div>
  );
}

export default Otp;
