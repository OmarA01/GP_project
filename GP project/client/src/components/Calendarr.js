import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);


const Calendarr = () => {

    const [events, setEvents] = useState([]);
    const [expandedEventId, setExpandedEventId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/AddEvent/Calendar", {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
            const myEvents = response.data.map(event => ({
              ...event,
              start: new Date(event.start),
              end: new Date(event.end)
            }));
            setEvents(myEvents);
          })
          .catch(error => {
            console.log('Error fetching events:', error);
          });
      }, []);
    
      const EventComponent = ({ event }) => {
        const isExpanded = expandedEventId === event.id;
        console.log(isExpanded);
        return (
          <div
            className={`event ${isExpanded ? 'expanded' : ''}`}
            onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
          >
            <strong>{event.title}</strong>
            {isExpanded && <div className="event-details">{
              event.Location
            }</div>}
          </div>
        );
      };

      const handleEventClick = (event) => {
        // Open a modal or change state to display the event details
        // 'event' is the clicked event object which will have all the properties of your event
        console.log(event); // For now, we'll just log it to see the event details
      };

    return ( 
        <div>
            <h1>Calendar</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                components={{
                  event: EventComponent
                }}
                style={{ 
                  height: 500,
                  padding: '10px', // Use quotes for string values
                  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)', // Use camelCase for CSS properties
                  backgroundColor: '#ffffff', // Use camelCase for CSS properties
                  marginTop: '70px', // Use quotes for string values
                  marginBottom: '70px',
                  marginRight: '400px',
                  marginLeft: '400px',
                }}
            />
        </div>
     );
}
 
export default Calendarr;
