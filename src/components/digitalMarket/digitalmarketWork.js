import React, { useEffect, useState } from 'react';

const DigitalmarketWork = () => {
    const authenticated =localStorage.getItem('token');
    //// console.log(authenticated)
    if(!authenticated){
      window.location.href="/"
    }
  const PAGE_SIZE = 7; // Number of works to display per page

  const [works, setWorks] = useState([]);
  const [completedWorks, setCompletedWorks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch data from the API route
    fetch('https://crmbackend-tawny.vercel.app/getClientsWork')
      .then((response) => response.json())
      .then((data) => {
        // Filter works into pending and completed based on localStorage
        console.log(data)
        const pendingWorks = data.clients.filter((work) => {
          return !localStorage.getItem(`completedWork_${work._id}`);
        });
        setWorks(pendingWorks);
        const savedCompletedWorks = Object.keys(localStorage)
          .filter((key) => key.startsWith('completedWork_'))
          .map((key) => JSON.parse(localStorage.getItem(key)));
        setCompletedWorks(savedCompletedWorks);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run the effect only once

  const markWorkAsCompleted = (work) => {
    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    // Create an object to store completed work details with both client name and package
    const completedWork = {
      date: formattedDate,
      clientName: work.name,
      package: work.package,
    };

    // Save the completed work in localStorage
    localStorage.setItem(`completedWork_${work._id}`, JSON.stringify(completedWork));

    // Remove the work from the list of pending works
    const updatedWorks = works.filter((w) => w._id !== work._id);
    setWorks(updatedWorks);

    // Add the completed work to the list of completed works
    setCompletedWorks([...completedWorks, completedWork]);
  };

  // Calculate the range of works to display based on the current page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const displayedWorks = works.slice(startIndex, endIndex);

  return (
    <div>
      <div className="digital-pending-works">
        <h4>Digital Market Pending Works</h4>
        {works.length === 0 ? (
          <div className="message-card">
          <p>You have completed all work.</p>
        </div>
        ) : (
          <table>
            {/* Table headers here... */}
            <tbody>
              {displayedWorks.map((work, index) => (
                <tr key={index}>
                  <td>{work.name}</td>
                  <td>{work.website
}</td>
                  <td>{work.package}</td>
                  <td>
                    <ul>
                      {work.actionsForDigitalMarketer.map((action, idx) => (
                        <li key={idx}>{action}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button onClick={() => markWorkAsCompleted(work)}>Complete Work</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="digital-completed-works">
        <h4>Digital Market Completed Works</h4>
        <table>
          {/* Table headers here... */}
          <thead>
            <tr>
              <th>Date</th>
              <th>Client Name</th>
              <th>Package</th>
            </tr>
          </thead>
          <tbody>
            {completedWorks.map((completedWork, index) => (
              <tr key={index}>
                <td>{completedWork.date}</td>
                <td>{completedWork.clientName}</td>
                <td>{completedWork.package}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DigitalmarketWork;
