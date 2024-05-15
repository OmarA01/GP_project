import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../CssFiles/ViewEvents.css"; // Import the external CSS file

const ViewEvents = () => {
  const [listOfEvents, setListOfEvents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
 
  
  useEffect(() => {
    axios
      .get("http://localhost:3001/AddEvent/EventEvaluation", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setListOfEvents(response.data);
      });
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredEvents = listOfEvents.filter(event =>
    event.ActivityName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const getStatusLabelForType = (eventType) => {
    if (eventType === '1') {
      return 'Accepted';
    } else if (eventType === '6') {
      return 'Rejected';
    } else {
      return 'Finished';
    }
  };

  return (
    <div className="bGround">
      <div className="heading">
        <h1 className="title">Event Evaluation</h1>
      </div>
      <input
      className="searchBar"
      type="text"
      placeholder="Search"
      value={searchInput}
      onChange={handleSearchInputChange}
      />
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
          <p className={`statusviewP ${value.Type === "1" ? "acceptedP" : value.Type === "6" ? "rejectedP" : "finishedP"}`}>
            <Link to={`/AddReport/${value.ActivityID}`}> Add Report </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ViewEvents;