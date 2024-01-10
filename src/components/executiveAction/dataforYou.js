import React, { useState, useEffect } from 'react';

const DataforYou = () => {
  const userId = localStorage.getItem('id');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://crmbackend-tawny.vercel.app/getData/${userId}`);

      if (response.ok) {
        const result = await response.json();
        setData(result.data);
        console.log(result.data)
      } else {
        console.error("Error in fetching data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (itemId) => {
    try {
      const response = await fetch(`https://crmbackend-tawny.vercel.app/update/${itemId}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newStatus: 'done' }),
      });

      if (response) {
        console.log(`Status updated to "done" successfully for item with _id: ${itemId}`);
        // After updating the status, you can re-fetch the data to update the UI
        fetchData();
      } else {
        console.log(response)
        console.error('Error updating status');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='crm-container-fluid crm-clients'>
      <h2>Data for You</h2>
      <table className='crm-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            // Check if the status is not 'done' before rendering the item
            if (item.status !== 'done') {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.company}</td>
                  <td>{item.mobile}</td>
                  <td>
                    <button onClick={() => handleStatusChange(item._id)} className='btn btn-dark'>
                      Call Done
                    </button>
                  </td>
                </tr>
              );
            }
            // Return null for items with status 'done' to skip rendering
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataforYou;
