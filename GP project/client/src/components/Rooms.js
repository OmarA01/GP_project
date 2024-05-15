import React from "react";
import '../CssFiles/Rooms.css'

const Rooms = () => {
    return (  
        
        <div className="rooms">
            <h2>List of Rooms</h2>
            <div class="panel">
            <ul class="room-list">
                <li>
                <div>Room 101</div>
                <button class="details-button">Details</button>
                <div class="room-info">Capacity: 2 | Department: Science</div>
                </li>
                <li>
                <div>Room 102</div>
                <button class="details-button">Details</button>
                <div class="room-info">Capacity: 4 | Department: Arts</div>
                </li>
                <li>
                <div>Room 103</div>
                <button class="details-button">Details</button>
                <div class="room-info">Capacity: 1 | Department: Engineering</div>
                </li>
            </ul>
            </div>
        </div>
    );
}
 
export default Rooms;

