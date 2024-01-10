import React, { useState } from 'react';
import axios from 'axios';
const DownloadAttend = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [error, setError] = useState(null);
    const authenticated =localStorage.getItem('token');
 // console.log(authenticated)
  if(!authenticated){
    window.location.href="/"
  }
    const handleDownload = async () => {
      try {
        const response = await axios.get(`https://crmbackend-tawny.vercel.app/download-attendance/${employeeId}`, {
          responseType: 'blob', // Specify that the response is binary data (Excel file)
        });
  
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Employee_Attendance_${employeeId}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        setError('No attendance data found for the specified employee.');
      }
    };
  
    return (
      <div className='div'>
        <h2>Download Employee Attendance</h2>
        <div>
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <button onClick={handleDownload}>Download</button>
        </div>
        {error && <p>{error}</p>}
      </div>
    );
  };

  export default DownloadAttend