import React, { useState } from "react";
import registration from '../../assest/registration.svg';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Add form validation here if needed
  
    // Create an object with the form data
    const formData = {
      username,
      email,
      password,
      confirmPassword,
    };
  
    try {
        const response = await fetch("https://crmbackend-anish-stack.vercel.app/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      
        if (response.ok) {
          const responseData = await response.json();
      
          // Access the message and display it
          const message = responseData.message;
         // console.log(message); // This will log the message
      
          toast.success("Registration successful!");
          setTimeout(()=>{
            window.location.href="/otp-verifcation"
          },3000)
          // Optionally, you can redirect the user to a login page or another page
        } else {
          toast.error("User already exists with this Email Id");
        }
      } catch (error) {
        // Handle network errors or other exceptions
        //console.error(error);
        toast.error("Registration failed. Please try again later.");
      }
    }      
  

  return (
    <div className="container">
      <div className="left">
        <div className="img-box">
          <img src={registration} alt="img" />
        </div>
      </div>
      <div className="right">
        <h3>Registration Form</h3>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
