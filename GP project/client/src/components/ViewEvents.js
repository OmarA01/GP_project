import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewEvents = () => {

    const [ListOfEvents, setListOfEvents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/AddEvent").then((response) => {
            setListOfEvents(response.data);
        })
    }, [])

    return (  
        <div className="Events" style={{display: "center", textAlign: "center"}}>
            {ListOfEvents.map((value, key) => {
                return <div>{value.ActivityName}</div>
            })}
        </div>
    );
}
 
export default ViewEvents;