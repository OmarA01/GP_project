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
} from "@mui/material";
import { Link } from "react-router-dom";
import React, {useState} from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const open = Boolean(anchorEl)
    const open1 = Boolean(anchorElUser)
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



    return (
        <AppBar position = 'sticky'>
            <Container maxWidth = 'xl'>
                <Toolbar disableGutters>
                    <IconButton size = 'large' edge = 'start' color = 'inherit' aria-label = 'logo'>
                    </IconButton>
                    <Typography
                        variant = 'h6'
                        noWrap
                        component = 'a'
                        href="#app-bar-with-responsive-menu"
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
                        <Button variant = 'contained'><Link to="/">Home</Link></Button>
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
                        <Button variant = 'contained'><Link to='/Calendar'> Calendar </Link></Button>
                        <Button variant = 'contained'><Link to='/Rooms'> Rooms </Link></Button>
                        <Button variant = 'contained'>More</Button>
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
                        <MenuItem onClick = {handleClose} ><Link to="/AddEvent"> Add Event </Link></MenuItem>
                        <MenuItem onClick = {handleClose}><Link to="/ViewEvents"> View Event </Link></MenuItem>
                        <MenuItem onClick = {handleClose}><Link to="/TrackEvents"> Track Event </Link></MenuItem>
                    </Menu>
                    <Box sx={{ flexGrow: 0 }}>
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
                            <MenuItem onClick = {handleCloseUserMenu}>Account</MenuItem>
                            <MenuItem onClick = {handleCloseUserMenu}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}