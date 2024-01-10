// src/components/ClientForm.js
import React, { useState } from "react";
import { toast } from "react-toastify";

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    businessWebsiteName: "",
    package: "",
    customerRequirements: "",
    discounts: "",
    followUp: "true",
        messageSend: false,
    paid: "",
    followUpDate: "",
  });
  const authenticated = localStorage.getItem("token");
  // console.log(authenticated)
  if (!authenticated) {
    window.location.href = "/";
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const TokenFromLocal = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have TokenFromLocal defined and set properly

    try {
      const response = await fetch(
        "https://crmbackend-tawny.vercel.app/create-client",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TokenFromLocal}`, // Use backticks to interpolate the token
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        toast.success("Client Created successful");
        //// console.log(response)
      } else if (response.status === 401) {
        // Assuming 401 is used for unauthorized access
        // Handle unauthorized access (e.g., user not logged in)
        toast.error("Please log in first to create a client");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      toast.error("Network Error");
      console.error(error);
    }
  };

  return (
    <div className="crm-client-form">
      <h2 className="crm-h2">Create a New Client</h2>
      <form onSubmit={handleSubmit}>
        <div className="crm-form-groups">
          <label htmlFor="name" className="crm-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="crm-input"
          />
        </div>
        <div className="crm-form-groups">
          <label htmlFor="mobileNumber" className="crm-label">
            Mobile Number:
          </label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="crm-input"
          />
        </div>
        <div className="crm-form-groups">
          <label htmlFor="email" className="crm-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="crm-input"
          />
        </div>
        <div className="crm-form-groups">
          <label htmlFor="businessWebsiteName" className="crm-label">
            Business Website Name:
          </label>
          <input
            type="text"
            id="businessWebsiteName"
            name="businessWebsiteName"
            value={formData.businessWebsiteName}
            onChange={handleChange}
            className="crm-input"
          />
        </div>
        <div className="crm-form-groups">
          <label htmlFor="package" className="crm-label">
            Package:
          </label>
          <select
            id="package"
            name="package"
            value={formData.package}
            onChange={handleChange}
            className="crm-select"
          >
            <option value="export-plan">Export Plan</option>
            <option value="gold-membership">Gold Membership</option>
            <option value="startup">Startup</option>
            <option value="global">Global</option>
          </select>
        </div>
        <div className="crm-form-groups">
          <label htmlFor="customerRequirements" className="crm-label">
            Customer Requirements:
          </label>
          <textarea
            type="text"
            id="customerRequirements"
            name="customerRequirements"
            value={formData.customerRequirements}
            onChange={handleChange}
            className="crm-textarea"
          />
        </div>
        <div className="crm-form-groups">
          <label htmlFor="discounts" className="crm-label">
            Discounts:
          </label>
          <input
            type="text"
            id="discounts"
            name="discounts"
            value={formData.discounts}
            onChange={handleChange}
            className="crm-input"
          />
        </div>
        <div className="crm-form-groups">
          <label htmlFor="paid" className="crm-label">
            Paid:
          </label>
          <select
            id="paid"
            name="paid"
            value={formData.paid}
            onChange={handleChange}
            className="crm-select"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

         <div className="crm-form-groups">
        <label htmlFor="followUp" className="crm-label">
          Follow Up:
        </label>
        <select
          id="followUp"
          name="followUp"
          value={formData.followUp}
          onChange={handleChange}
          className="crm-select"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        </div>

        <div className="crm-form-group">
          <label htmlFor="messageSend" className="crm-label">
            Message Send:
          </label>
          <select
            id="messageSend"
            name="messageSend"
            value={formData.messageSend}
            onChange={handleChange}
            className="crm-select"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="crm-form-group">
          <label htmlFor="followUpDate" className="crm-label">
            Follow-Up Date:
          </label>
          <input
            type="text"
            id="followUpDate"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={handleChange}
            // Optionally, you can specify a minimum date
            // min="yyyy-mm-dd" // Replace with an actual date if needed
            className="crm-input"
          />
        </div>
        <button className="crm-button" type="submit">
          Create Client
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
