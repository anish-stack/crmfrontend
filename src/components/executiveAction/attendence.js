import React, { useEffect, useState } from 'react';

const YourAttend = () => {
  const userid = localStorage.getItem('id');
  const [loginData, setLoginData] = useState({ message: '', loginTimes: [] });

  useEffect(() => {
    const getAttendance = async () => {
      try {
        const response = await fetch('https://crmbackend-tawny.vercel.app/get-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ executiveId: userid }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
 
        const data = await response.json();
        setLoginData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getAttendance();
  }, [userid]);

  return (
    <div>
      <h1>Your Attendances</h1>
      <table style={{ border: '1px solid #000', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #000' }}>User ID</th>
            <th style={{ border: '1px solid #000' }}>Login Times</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #000' }}>{userid}</td>
            <td style={{ border: '1px solid #000' }}>
              <ul>
                {loginData.loginTimes.map((loginTime, index) => (
                  <li key={index}>{loginTime}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <p>{loginData.message}</p>
    </div>
  );
};

export default YourAttend;
