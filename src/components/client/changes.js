// src/components/UpdateClientReport.js
import React, {  useState } from 'react';

const UpdateClientReport = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [Package, setPackage] = useState('');
  const [customerRequirements, setCustomerRequirements] = useState('');
  const [discounts, setDiscounts] = useState('');
  const [paid, setPaid] = useState('');
  const [followUp, setFollowUp] = useState(false);
  const [messageSend, setMessageSend] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 

  const token = localStorage.getItem('token')
 // console.log(token)
  if(!token){
    window.location.href="/"
  }
  const handleSubmit = async (e) => {
  e.preventDefault()
    try {
      const response = await fetch('https://crmbackend-tawny.vercel.app/Change-ClientDetails', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          mobileNumber,
          Package,
          customerRequirements,
          discounts,
          followUp,
          messageSend,
        }),
      });

      const data = await response.json();
     // console.log(data)
      if (response.status === 200) {
        setSuccessMessage('Client report updated successfully.');
        setErrorMessage('');
      } else if (response.status === 404) {
        setErrorMessage('No user found with this mobile number.');
        setSuccessMessage('');
      } else {
        setErrorMessage('Internal server error. Please try again later.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your internet connection.');
      setSuccessMessage('');
      //console.error(error);
    }
  };

  return (
<div className="crm-cons">
  <h2>Update Client Report</h2>
  <form onSubmit={handleSubmit}>
    <div className="crm-form-group">
      <label htmlFor="mobileNumber">Mobile Number:</label>
      <input
        type="text"
        id="mobileNumber"
        placeholder="Enter mobile number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
    </div>
    <div className="crm-form-group">
      <label htmlFor="package">Package:</label>
      <input
        type="text"
        id="package"
        placeholder="Enter package"
        value={Package}
        onChange={(e) => setPackage(e.target.value)}
      />
    </div>
   
    <div className="crm-form-group">
      <label htmlFor="customerRequirements">Customer Requirements:</label>
      <input
        type="text"
        id="customerRequirements"
        placeholder="Enter customer requirements"
        value={customerRequirements}
        onChange={(e) => setCustomerRequirements(e.target.value)}
      />
    </div>
    <div className="crm-form-group">
      <label htmlFor="discounts">Discounts:</label>
      <input
        type="text"
        id="discounts"
        placeholder="Enter discounts"
        value={discounts}
        onChange={(e) => setDiscounts(e.target.value)}
      />
    </div>
    <div className="crm-form-group">
      <label htmlFor="followUp">Follow Up:</label>
      <input
        type="checkbox"
        id="followUp"
        checked={followUp}
        onChange={(e) => setFollowUp(e.target.checked)}
      />
    </div>
    <div className="crm-form-group">
      <label htmlFor="messageSend">Message Send:</label>
      <input
        type="checkbox"
        id="messageSend"
        checked={messageSend}
        onChange={(e) => setMessageSend(e.target.checked)}
      />
    </div>
    <button type="submit" className="crm-button">Update Report</button>
  </form>
  {successMessage && <p className="crm-success">{successMessage}</p>}
  {errorMessage && <p className="crm-error">{errorMessage}</p>}
</div>

  );
};

export default UpdateClientReport;
