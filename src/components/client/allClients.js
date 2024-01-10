// src/components/ClientList.js
import React, { useEffect, useState } from 'react';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [token, setToken] = useState('');
  const authenticated =localStorage.getItem('token');
 // console.log(authenticated)
  if(!authenticated){
    window.location.href="/"
  }
  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      // Make a request to fetch clients using the token
      fetchClients();
    }
  }, [token]);

  const fetchClients = async () => {
    try {
      const response = await fetch('https://crmbackend-tawny.vercel.app/getClients', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
  
        // Filter clients with "active" status
        const activeClients = data.clients.filter((client) => client.status === 'active');
        
        console.log(activeClients);
  
        setClients(activeClients);
      } else {
        // Handle other status codes (e.g., 401 for unauthorized)
        console.error('Error fetching clients:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  const handleDeleteClient = async (clientId) => {
    try {
      const response = await fetch(`https://crmbackend-tawny.vercel.app/delete-client/${clientId}`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Remove the deleted client from the list
        setClients(clients.filter(client => client._id !== clientId));
      } else {
        // Handle other status codes (e.g., 401 for unauthorized)
        console.error('Error deleting client:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
<div className="crm-container-fluid crm-clients">
  <h2>Client List</h2>
  <table className="crm-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Mobile Number</th>
        <th>Email</th>
        <th>Business Website Name</th>
        <th>Customer Requirements</th>
        <th>Discounts</th>
        <th>Follow Up</th>
        <th>Follow Up Date</th>
        <th>Message Send</th>
        <th>Paid</th>
        <th>Status</th>
        <th>Package</th>
        <th>Delete Clients</th>
        {/* Add more table headers for other client attributes */}
      </tr>
    </thead>
    <tbody>
      {clients.map((client) => (
        <tr key={client._id}>
          <td>{client.name}</td>
          <td>{client.mobileNumber}</td>
          <td>{client.email}</td>
          <td>{client.businessWebsiteName}</td>
          <td>{client.customerRequirements}</td>
          <td>{client.discounts}%</td>
          <td>{client.followUp ? 'Yes' : 'No'}</td>
          <td>{client.followUpDate}</td>
          <td>{client.messageSend ? 'Yes' : 'No'}</td>
          <td>{client.paid.toLowerCase() === 'yes' ? 'Yes' : 'No'}</td>
          <td>{client.status}</td>
          <td>{client.package}</td>
          <td>
            <button className='crm-delete-clients btn btn-danger' type="button" onClick={() => handleDeleteClient(client._id)}>Delete</button>
          </td>
          {/* Add more table cells for other client attributes */}
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default ClientList;
