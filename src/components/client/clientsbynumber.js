// src/components/ClientByNumber.js
import React, { useEffect, useState } from "react";

const ClientByNumber = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [client, setClient] = useState(null);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const authenticated =localStorage.getItem('token');
 // console.log(authenticated)
  if(!authenticated){
    window.location.href="/"
  }
  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      // Make a request to fetch clients using the token
      handleSearch();
    }
  }, [token]);
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch("https://crmbackend-tawny.vercel.app/getClientByNumber", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setClient(data.client);
       // console.log(data);
        setError("");
      } else if (response.status === 404) {
        setClient(null);
        setError("No user found with this mobile number.");
      } else {
        setClient(null);
        setError("Internal server error. Please try again later.");
      }
    } catch (error) {
      setClient(null);
      setError("Network error. Please check your internet connection.");
      //console.error(error);
    }
  };

  return (
    <div className="crm-clients crm-cons">
    <h2>Client Lookup by Mobile Number</h2>
    <div className="crm-form-group">
      <label htmlFor="mobileNumber">Mobile Number:</label>
      <input
        type="text"
        id="mobileNumber"
        placeholder="Enter mobile number"
        value={mobileNumber}
        onChange={handleMobileNumberChange}
      />
      <button className="crm-search" onClick={handleSearch}>Search</button>
    </div>
    {error && <p className="crm-error">{error}</p>}
    {client && (
      <div className="crm-client-details">
        <h3>Client Details:</h3>
        <p>Name: {client.name}</p>
        <p>Email: {client.email}</p>
        <p>businessWebsiteName: {client.businessWebsiteName}</p>
        <p>customerRequirements: {client.customerRequirements}</p>
        <p>discounts: {client.discounts}%</p>
        <p>followUp: {client.followUp ? "Yes" : "No"}</p>
        <p>followUpDate: {client.followUpDate}</p>
        <p>messageSend: {client.messageSend ? "Yes" : "No"}</p>
        <p>package: {client.package}</p>
      </div>
    )}
  </div>
  
  );
};

export default ClientByNumber;
