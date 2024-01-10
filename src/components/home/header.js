import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
const Header = () => {
  const role = localStorage.getItem('Role');
  const handleLogut=()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("Role");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
  }
  useEffect(() => {
    //// console.log(role); // Output the role to the console for debugging
  }, [role]); // Run this effect whenever the role changes

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light' style={{ position: 'sticky', top: 0 }}>
      <ul className='navbar-nav flex-column'>
        <li className='nav-item'>
          <Link className='nav-link' to="/home">Home</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to="/makeClients">Create Client</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to="/FollowUp">Follow Up</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to="/updateClientNumber">Change Details</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to="/getClientsbyNumber">Get Client By Number</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to="/getClients">Get Clients</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to="/download-clients-data">Download Client Data</Link>
        </li>
        {/* <li className='nav-item'>
          <Link className='nav-link' to="/download-Attendance">Download Attendance</Link>
        </li> */}
        <li className='nav-item'>
          <Link className='nav-link' to="/Block">Block Clients</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to="/done">Done calls</Link>
        </li>


        {role === "digital-Marketer" && (
          <li className='nav-item'>
            <Link className='nav-link' to="/showWork">Your Work</Link>
          </li>
        )}

        <li className='nav-item'>
          <Link className='nav-link' to="/profile">Profile</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to="/getWork">GetWork</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' onClick={handleLogut} to="/">Logout</Link>
        </li>
      </ul>
  </nav>
  )
}

export default Header