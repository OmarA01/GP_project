import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Event = () => {

    let { id } = useParams();

    const [eventObject, setEventObject] = useState({
        event: {},
        attendances: []
    });

    const [filteredAttendances, setFilteredAttendances] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/AddEvent/byId/${id}`, {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
            setEventObject({
                event: response.data,
                attendances: response.data.attendances || []
            });
            console.log(response.data);
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    },[id])

    useEffect(() => {
        if (searchTerm) {
            const filtered = eventObject.attendances.filter(attendance =>
                attendance.Name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredAttendances(filtered);
        } else {
            setFilteredAttendances(eventObject.attendances);
        }
    }, [searchTerm, eventObject.attendances]);


    return (  
        <div>
            <h1>{eventObject.event.Type}</h1>
            <h2>Attendances</h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto', border: '3px solid gray', padding: '10px' }}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ margin: '10px 0', padding: '8px', width: '300px' }}
                />
                {filteredAttendances.length > 0 ? (
                    <ul>
                        {filteredAttendances.map((attendance, index) => (
                            <li key={index}>
                                Name: {attendance.Name}, VIP: {attendance.IsVIP ? 'Yes' : 'No'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No attendances found.</p>
                )}
            </div>
        </div>
    );
}
 
export default Event;