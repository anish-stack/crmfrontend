import React, { useState, useEffect } from 'react';

const ExecutiveLookup = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if there's an email in localStorage
    const email = localStorage.getItem('email');

    if (email) {
      // Perform the lookup only if email is found
      handleLookup(email);
    }
  }, []);

  const handleLookup = async (email) => {
    try {
      const response = await fetch(`https://crmbackend-tawny.vercel.app/getExecutive/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data.user);
        setErrorMessage('');
      } else if (response.status === 404) {
        setErrorMessage('User not found');
        setUser(null);
      } else {
        setErrorMessage('Internal server error. Please try again later.');
        setUser(null);
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your internet connection.');
      setUser(null);
      //console.error(error);
    }
  };

  return (
    <div className="executive-lookup-container">
    {errorMessage && <p className="error">{errorMessage}</p>}
    {user && (
      <div className="user-details">
        <h3>Executive Details:</h3>
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    )}
  </div>
  );
};

export default ExecutiveLookup;
