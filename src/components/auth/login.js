import React, { useState } from "react";
import login from '../../assest/login.jpg';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Add form validation here if needed
  
    // Create an object with the form data
    const formData = {
    
      email,
      password
    };
  
    try {
      const response = await fetch("https://crmbackend-tawny.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    
      const responseData = await response.json();
      
      //// console.log(responseData)
      if (responseData.success === true) { // Check if success is true
        // Access the message and display it
        const message = responseData.message;
        localStorage.setItem("token",responseData.token);
        localStorage.setItem("email",responseData.user.email);
        localStorage.setItem("Role",responseData.user.role);
        localStorage.setItem("id",responseData.user._id);
        toast.success(message);
        

        setTimeout(() => {
          window.location.href="/home"
        }, 3000);
        
        // Optionally, you can redirect the user to a login page or another page
      } else {
        // Handle login failure here
        const message = responseData.message;

        toast.error(message);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      // console.error(error);
      toast.error("Login failed. Please try again later.");
    }
    
    }      
  

  return (
<div className="crm-container">
  <div className="row">
    <div className="col-md-6 col-sm-12">
      <div className="crm-img-box">
        <img src={login} alt="img" />
      </div>
    </div>
    <div className="col-md-6 col-sm-12">
      <h3>Login Form</h3>
      <form className="crm-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="email" className="crm-form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="crm-form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="crm-form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="crm-form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 crm-form-group">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default Login;
