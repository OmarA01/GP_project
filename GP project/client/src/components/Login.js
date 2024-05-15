import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CssFiles/Lo.css";

function Login({onLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        const data = { Email: email, Password: password }
        axios.post("http://localhost:3001/login", data).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                localStorage.setItem("accessToken", response.data.token);
                onLogin(response.data.username, response.data.Role);

                const redirectPath = new URLSearchParams(location.search).get('redirect');
                navigate(redirectPath || "/");
            }
        }).catch(error => {
            if(error.response)
                alert(error.response.data.error)
            else if(error.request)
                alert(error.request)
            else
                alert(error.message)
        })
    };

    return (
        <>
            
            <div className="bgImg">
            <div className="container">
                <form onSubmit={onSubmit}>
                    <h1>Log In</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }} 
                            />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }} 
                            />
                        </div>
                        <button className="fluid ui button blue">Log In</button>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
}

export default Login;
