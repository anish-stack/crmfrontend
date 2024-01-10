import React, { useState } from 'react';

const Download = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [fileUrl, setFileUrl] = useState(null);
  const authenticated =localStorage.getItem('token');
 // console.log(authenticated)
  if(!authenticated){
    window.location.href="/"
  }
  const handleDownload = async () => {
    try {
      // Replace 'employee_id_here' with the actual employee ID you want to use
      const response = await fetch(`https://crmbackend-tawny.vercel.app/Download-client-data/${employeeId}`, {
        method: 'GET', // Change the HTTP method to GET
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setFileUrl(url);
      } else {
        console.error('Failed to download client data');
      }
    } catch (error) {
      console.error('Error while downloading client data', error);
    }
  };

  return (
    <div className="div">
      <h2>Download Client Data</h2>
      <div>
        <label htmlFor="employeeId">Employee ID:</label>
        <input
          type="text"
          id="employeeId"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
      </div>
      <button onClick={handleDownload}>Download Client Data</button>
      {fileUrl && (
        <div>
          <a href={fileUrl} download="Clients.pdf">
            Click here to download the PDF file
          </a>
        </div>
      )}
    </div>
  );
};


export default Download;
