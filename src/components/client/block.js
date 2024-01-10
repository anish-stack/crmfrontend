import React, { useEffect, useState } from 'react';

const BlockClientList = () => {
  const [clients, setClients] = useState([]);
  const [token, setToken] = useState('');
  const id = localStorage.getItem('id');

  const authenticated = localStorage.getItem('token');

  if (!authenticated) {
    window.location.href = '/';
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
      const response = await fetch('https://crmbackend-tawny.vercel.app/follow-up-clients', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const responseData = await response.json();

        if (Array.isArray(responseData.data)) {
          // Filter the data where id and submittedBy match and status is 'blocked'
          const filteredClients = responseData.data.filter((client) => client.submittedBy === id && client.status === 'blocked');
          setClients(filteredClients);
          localStorage.setItem('all-followUp', filteredClients.length);
        } else {
          console.error('Received data.data is not an array:', responseData.data);
        }
      } else {
        // Handle other status codes (e.g., 401 for unauthorized)
        console.error('Error fetching clients:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="crm-container-fluid crm-clients">
      <h2>Blocked Client List</h2>
      <table className="crm-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>businessWebsiteName</th>
            <th>customerRequirements</th>
            <th>discounts</th>
            <th>followUp</th>
            <th>followUpDate</th>
            <th>status</th>
            <th>messageSend</th>
            <th>Paid</th>
            <th>package</th>
            {/* Add more table headers for other client attributes */}
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((data) => (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.mobileNumber}</td>
                <td>{data.email}</td>
                <td>{data.businessWebsiteName}</td>
                <td>{data.customerRequirements}</td>
                <td>{data.discounts}%</td>
                <td>{data.followUp ? 'Yes' : 'No'}</td>
                <td>{data.followUpDate}</td>
                <td>{data.status}</td>
                <td>{data.messageSend ? 'Yes' : 'No'}</td>
                <td>{data.paid.toLowerCase() === 'yes' ? 'Yes' : 'No'}</td>
                <td>{data.package}</td>
                {/* Add more table cells for other client attributes */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12">No blocked clients found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlockClientList;
