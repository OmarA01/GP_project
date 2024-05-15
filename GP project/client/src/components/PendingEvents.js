import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { Alert, Box, createMuiTheme, Grid, responsiveFontSizes, TextField, ThemeProvider, Typography } from "@mui/material";


const PendingEvents = () => {
    const theme = responsiveFontSizes(
        createMuiTheme({
            typography: {
                fontFamily: [
                    'Montserrat',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Arial',
                    'sans-serif',
                ].join(','),
            },
        })
    );

    const [pendingEvents, setPendingEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [confirmAcceptMap, setConfirmAcceptMap] = useState({});
    const [confirmRejectMap, setConfirmRejectMap] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3001/AddEvent/PendingEvents", { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
            setPendingEvents(response.data);
        })
    }, [])

    const handleAccept = (id) => {
        setSelectedEventId(id);
        setConfirmAcceptMap(prevState => ({ ...prevState, [id]: true }));
    }

    const handleReject = (id) => {
        setSelectedEventId(id);
        setConfirmRejectMap(prevState => ({ ...prevState, [id]: true }));
    }

    const confirmAction = (action, id) => {
        if (action === 'accept') {
            axios.put(`http://localhost:3001/AddEvent/AcceptEvent/${id}`, null, { headers: { accessToken: localStorage.getItem("accessToken") } })
                .then((response) => {
                    if (response.data.error)
                        alert(response.data.error);
                    else {
                        console.log(response.data.message);
                        setPendingEvents(prevEvents => prevEvents.filter(event => event.ActivityID !== id));
                    }
                    setConfirmAcceptMap(prevState => ({ ...prevState, [id]: false }));
                    setSelectedEventId(null);
                })
                .catch((error) => {
                    console.error("Error accepting event:", error);
                    setConfirmAcceptMap(prevState => ({ ...prevState, [id]: false }));
                    setSelectedEventId(null);
                });
        } else if (action === 'reject') {
            axios.put(`http://localhost:3001/AddEvent/RejectEvent/${id}`, null, { headers: { accessToken: localStorage.getItem("accessToken") } })
                .then((response) => {
                    if (response.data.error)
                        alert(response.data.error);
                    else {
                        console.log(response.data.message);
                        setPendingEvents(prevEvents => prevEvents.filter(event => event.ActivityID !== id));
                    }
                    setConfirmRejectMap(prevState => ({ ...prevState, [id]: false }));
                    setSelectedEventId(null);
                })
                .catch((error) => {
                    console.error("Error rejecting event:", error);
                    setConfirmRejectMap(prevState => ({ ...prevState, [id]: false }));
                    setSelectedEventId(null);
                });
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="bGround">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="40vh"
                >
                    <Grid item xs={6}>
                        <Typography variant="h1" color="black" fontWeight="bold">
                            Pending Events
                        </Typography>
                    </Grid>
                    {pendingEvents.map((value, key) => (
                        <Grid item xs={6} key={value.ActivityID}>
                            <TextField
                                variant="outlined"
                                value={value.ActivityName}
                                fullWidth
                                helperText=" "
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                        <React.Fragment>
                                            <Button
                                                variant="text"
                                                color="primary"
                                                data-eventid={value.ActivityID}
                                            >
                                                <Link to={`/ViewEvents/${value.ActivityID}`}> Details </Link>
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color={'success'}
                                                onClick={() => handleAccept(value.ActivityID)}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color={'error'}
                                                onClick={() => handleReject(value.ActivityID)}
                                            >
                                                Reject
                                            </Button>
                                        </React.Fragment>
                                    ),
                                }}
                            />
                            {/* Confirmation Dialog for Accept */}
                            {confirmAcceptMap[value.ActivityID] && (
                                <Alert
                                    severity="info"
                                    action={
                                        <React.Fragment>
                                            <Button onClick={() => confirmAction('accept', value.ActivityID)} color="inherit" size="small">
                                                Confirm
                                            </Button>
                                            <Button onClick={() => setConfirmAcceptMap(prevState => ({ ...prevState, [value.ActivityID]: false }))} color="inherit" size="small">
                                                Cancel
                                            </Button>
                                        </React.Fragment>
                                    }
                                >
                                    Confirm Accepting the Event?
                                </Alert>
                            )}
                            {/* Confirmation Dialog for Reject */}
                            {confirmRejectMap[value.ActivityID] && (
                                <Alert
                                    severity="warning"
                                    action={
                                        <React.Fragment>
                                            <Button onClick={() => confirmAction('reject', value.ActivityID)} color="inherit" size="small">
                                                Confirm
                                            </Button>
                                            <Button onClick={() => setConfirmRejectMap(prevState => ({ ...prevState, [value.ActivityID]: false }))} color="inherit" size="small">
                                                Cancel
                                            </Button>
                                        </React.Fragment>
                                    }
                                >
                                    Confirm Rejecting the Event?
                                </Alert>
                            )}
                        </Grid>
                    ))}
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default PendingEvents;
