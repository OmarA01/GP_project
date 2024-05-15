import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../CssFiles/ViewEvents.css";

const ViewEvents = () => {
  const [listOfEvents, setListOfEvents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filterType, setFilterType] = useState('ActivityName');

  useEffect(() => {
    axios
      .get("http://localhost:3001/AddEvent/ViewEvents", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setListOfEvents(response.data);
      });
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredEvents = listOfEvents.filter(event =>
    event[filterType].toLowerCase().includes(searchInput.toLowerCase())
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
        <h1 className="title">View Events</h1>
      </div>
      <div className="searchContainer">
        <input
          className="searchBar"
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <select className="filterDropdown" value={filterType} onChange={handleFilterTypeChange}>
          <option value="ActivityName">Event Name</option>
          <option value="Location">Location</option>
          <option value="Organizer">Organizer</option>
          <option value="DateOfEvent">Date</option>
        </select>
      </div>
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
          <p className={`statusViewP ${value.Type === "1" ? "acceptedP" : value.Type === "6" ? "rejectedP" : "finishedP"}`}>
            {value.Type === "1" ? "Accepted" : value.Type === "6" ? "Rejected" : "Finished"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ViewEvents;