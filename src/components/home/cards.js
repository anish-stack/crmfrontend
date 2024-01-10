import React, { useEffect, useState } from 'react';
import { FaUser, FaClock, FaCalendar, FaTasks } from 'react-icons/fa'; // Import icons from react-icons
import { Link } from 'react-router-dom';
const Cards = () => {
  const authenticated =localStorage.getItem('token');
 // console.log(authenticated)
  if(!authenticated){
    window.location.href="/"
  }
    const [currentTime, setCurrentTime] = useState(new Date());
    const FollowUp = localStorage.getItem('all-followUp')
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="card-container">
      {/* User Data Card */}
      <div className="card">
        <FaUser className="card-icon user-icon" />
        <div className="card-content">
          <h3>User Data</h3>
          {FollowUp}
        </div>
      </div>

      {/* Time Card */}
      {/* I comit for testing */}
      <div className="card">
        <FaClock className="card-icon time-icon" />
        <div className="card-content cardhaibhai">
          <h3>Time</h3>
          {currentTime.toLocaleTimeString('en-IN')}        </div>
      </div>

      {/* Attendance Card */}
      <div className="card">
        <FaCalendar className="card-icon attendance-icon" />
        <div className="card-content">
          <Link to="/show-attendance">
          <h3>Attendance</h3>
          </Link>
          {/* Add attendance-related content here */}
        </div>
      </div>

      {/* Tasks Card */}
      <div className="card">
        <FaTasks className="card-icon tasks-icon" />
        <div className="card-content">
          <h3>Tasks</h3>
          {/* Add tasks-related content here */}
        </div>
      </div>
    </div>
  );
}

export default Cards;
