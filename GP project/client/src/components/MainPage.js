import {
    Box,
    AppBar,
    Stack,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Menu,
    MenuItem,
} from "@mui/material";
import React, {useState} from "react";
import Image from "../Images/PsutUni.jpg";
import '../App.css';



const MainPage = () => {
    
    return(
        <section className="hero" style={{backgroundImage: `url(${Image})`}}>
            <div className="content">
                <h1 style={{color: 'black'}}> WELCOME TO <br></br>PSUT EVENTS</h1>
                <p>RESERVE YOUR NEXT EVENT IN AN INNOVATIVE ENVIRONMENT </p>
            </div>
        </section>
    )
}

export default MainPage;