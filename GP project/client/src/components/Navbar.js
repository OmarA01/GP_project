import {
    AppBar,
    Stack,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Menu,
    MenuItem,
    Container,
    Box,
    Tooltip,
    Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../CssFiles/Navbar.css';

export const NavBar = ({username, Role, onLogout}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElMore, setAnchorElMore] = useState(null);
    const [newEventsCount, setNewEventsCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3001/AddEvent/PendingEvents", { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
            const pendingEvents = response.data; // Assuming response.data is an array of events
            const eventsCount = pendingEvents.length;
            console.log("Number of pending events:", eventsCount);
            setNewEventsCount(eventsCount);
        })
        .catch((error) => {
            console.error("Error fetching pending events:", error);
        });

    }, []);

    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorElUser);
    const openMore = Boolean(anchorElMore);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }
    const handleMoreClick = (event) => {
        setAnchorElMore(event.currentTarget);
    }
    const handleMoreClose = () => {
        setAnchorElMore(null);
    }

    let navigate = useNavigate();
    const Logout = () => {
        navigate("/");
        onLogout();
    }


    return (
        <AppBar position = 'sticky'>
            <Container maxWidth = 'xl'>
                <Toolbar disableGutters>
                    <IconButton size = 'large' edge = 'start' color = 'inherit' aria-label = 'logo'>
                    </IconButton>
                    <Typography
                        className = "LogoToHome"
                        variant = 'h6'
                        noWrap
                        component = {Link}
                        to = "/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            flexGrow: 1}}>
                        PSUT Events 
                    </Typography>
                    <Stack
                        direction = 'row'
                        spacing = {1}
                        sx = {{ flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Button className = "NavBarButtons" variant = 'contained' component = {Link} to = "/">Home</Button>
                        <Button
                            variant = 'contained'
                            id = 'em-button'
                            onClick = {handleClick}
                            aria-controls = {open ? 'em-menu' : undefined}
                            aria-haspopup = 'true'
                            aria-expanded = {open ? 'true' : undefined}
                            endIcon = {<KeyboardArrowDownIcon/>}
                        >
                            Event Management
                        </Button>
                        <Button className = "NavBarButtons" variant = 'contained' component = {Link} to = "/Calendar">Calendar</Button>
                        <Button className = "NavBarButtons" variant = 'contained' component = {Link} to = "/Rooms">Rooms</Button>
                        {Role != 6 && (
                            <>
                            <Badge badgeContent={newEventsCount} color="error">
                                <Button className="NavBarButtons" variant = 'contained' component = {Link} to = "/PendingEvents">Pending</Button>
                            </Badge>
                            </>
                        )}
                        <Button
                            variant="contained"
                            id="more-button"
                            aria-controls={openMore ? 'more-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMore ? 'true' : undefined}
                            onClick={handleMoreClick}
                            endIcon={<KeyboardArrowDownIcon/>}
                        >
                            More
                        </Button>
                    </Stack>
                    <Menu id = 'em-menu' anchorEl={anchorEl} open={open} MenuListProps={{
                        'aria-labelledby': 'em-menu',
                    }}
                        onClose = {handleClose}
                        anchorOrigin = {{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                        transformOrigin = {{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                    >
                        <MenuItem onClick = {handleClose}  component = {Link} to = "/AddEvent">Add Event</MenuItem>
                        <MenuItem onClick = {handleClose} component = {Link} to = "/ViewEvents">View Event</MenuItem>
                        <MenuItem onClick = {handleClose} component = {Link} to = "/TrackEvents">Track Event</MenuItem>
                    </Menu>
                    <Menu
                        id="more-menu"
                        anchorEl={anchorElMore}
                        open={openMore}
                        onClose={handleMoreClose}
                        MenuListProps={{
                            'aria-labelledby': 'more-button',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >{Role == 4 && (
                        <MenuItem onClick={handleMoreClose} component={Link} to="/EventEvaluation"> Event Evaluation </MenuItem>
                    )}
                    </Menu>
                    {username}
                    <Box sx={{ flexGrow: 0, marginLeft: '15px' }}>
                        <Tooltip title="User settings">
                            <IconButton id = 'user-button' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleIcon fontSize = 'large'/>
                                <KeyboardArrowDownIcon/>
                            </IconButton>
                        </Tooltip>
                        <Menu id = 'user-menu' anchorEl={anchorElUser} open={open1} MenuListProps={{
                            'aria-labelledby': 'user-menu',
                        }}
                              onClose = {handleCloseUserMenu}
                              anchorOrigin = {{
                                  vertical: 'bottom',
                                  horizontal: 'right'
                              }}
                              transformOrigin = {{
                                  vertical: 'top',
                                  horizontal: 'right'
                              }}
                        >
                            <MenuItem onClick = {handleCloseUserMenu} component={Link} to ="/Account">Account</MenuItem>
                            <MenuItem onClick = {Logout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}