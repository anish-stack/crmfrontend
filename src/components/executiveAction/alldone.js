import React, { useState, useEffect } from 'react';

const DoneData = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem('id'); // Retrieve user ID from local storage

  const fetchData = async () => {
    try {
      const response = await fetch(`https://crmbackend-tawny.vercel.app/done-data?dataFor=${userId}`);

      if (response.ok) {
        const result = await response.json();
        setData(result.data);
        console.log(result.data);
      } else {
        console.log(data);

        console.error('Error in fetching data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData(); // Fetch data only if userId is available
    }
  }, [userId]);

  return (
    <div className='crm-container-fluid crm-clients'>
      <h2>Done Data</h2>
      <table className='crm-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Mobile</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            if (item.status === 'done') {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.company}</td>
                  <td>{item.mobile}</td>
                  <td>{item.status}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DoneData;
