import React from "react";
import { useParams } from "react-router-dom";

const Event = () => {

    let { id } = useParams();

    return (  
        <div>
            <h1> shit {id}</h1>
        </div>
    );
}
 
export default Event;