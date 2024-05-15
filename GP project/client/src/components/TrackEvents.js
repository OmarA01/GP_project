import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../CssFiles/TrackEvents.css"; // Import the external CSS file

const TrackEvents = () => {
  const [listOfEvents, setListOfEvents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState('');

  
  useEffect(() => {
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    }

    axios
      .get("http://localhost:3001/AddEvent/TrackEvents", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setListOfEvents(response.data);
      });
  }, [location.state]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredEvents = listOfEvents.filter(event =>
    event.ActivityName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const getStatusLabelForType = (eventType) => {
    if (eventType === '5') {
      return 'Waiting for Direct Manager to accept';
    } else if (eventType === '4') {
      return 'Waiting for Public relation manager to accept';
    }else if (eventType === '3') {
        return 'Waiting for Administration manager to accept';
    } else if (eventType === '2') {
        return 'Waiting for Vice President to accept';
    }  else {
      return 'Rejected';
    }
  };

  return (
    <div className="bGround">
      <div className="heading">
        <h1 className="title">Track Events</h1>
      </div>
      <input
      className="searchBar"
      type="text"
      placeholder="Search"
      value={searchInput}
      onChange={handleSearchInputChange}
      />
      {successMessage && <div className="successMessage">{successMessage}</div>}

      {filteredEvents.map((value, key) => (
        <div key={value.ActivityID}>
          <div className="eventP">
            <div className="eventNameContainer">
              <span className="eventName">{value.ActivityName}</span>
              <span className="eventDate">{value.DateOfEvent.split('T')[0]}</span>
            </div>
            <p className="detailsP">
              <Link to={`/ViewEvents/${value.ActivityID}`}>Details</Link>
            </p>
          </div>
          <p className="statusP">
            {getStatusLabelForType(value.Type)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TrackEvents;