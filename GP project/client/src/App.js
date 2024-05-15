import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from './components/MainPage';
import { NavBar } from './components/Navbar';
import AddEvent from './components/AddEvent';
import ViewEvents from './components/ViewEvents';
import PendingEvents from "./components/PendingEvents";
import TrackEvents from './components/TrackEvents';
import Calendar from './components/Calendarr';
import Rooms from './components/Rooms';
import Login from './components/Login';
import Event from './components/Event';
import AddReport from './components/AddReport';
import EventEvaluation from "./components/EventEvaluation";
import Account from "./components/Account";
import axios from "axios";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState({
    username: "",
    Role: 6,
    status: false
  }); 

  useEffect(() => {
    axios.get("http://localhost:3001/login/auth", {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
      if(response.data.error){
        setIsLoggedIn({
          username:"",
          Role: 6,
          status: false
        });
        if (response.data.error === "Session expired") {
          localStorage.removeItem("accessToken");
        }
      }
      else {
        setIsLoggedIn({
          username: response.data.username,
          Role: response.data.Role,
          status: true
        });
      }
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        // Token invalid or not provided, handle by redirecting to login or clearing invalid tokens
        localStorage.removeItem("accessToken");
        setIsLoggedIn({username: "", Role: 6, status: false});
      }
    });
  }, [])

  const handleLogin = (username, Role) => {
    setIsLoggedIn({username: username, Role: Role, status: true});
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn({username: "", Role: 6, status: false});
  };

  return (
    <Router>
    <div className='App'>
      {isLoggedIn.status && <NavBar username={isLoggedIn.username} Role={isLoggedIn.Role} onLogout={handleLogout}/>}
      <div>
        <Routes>
          {!isLoggedIn.status && <Route path="/" element={<Login onLogin={handleLogin} />} />}
          {isLoggedIn.status && (
            <>
              <Route path="/" element={<MainPage />} />
              <Route path="/AddEvent" element={<AddEvent />} />
              <Route path="/ViewEvents" element={<ViewEvents  />} />
              <Route path="/PendingEvents" element={<PendingEvents />} />
              <Route path="/ViewEvents/:id" element={<Event />} />
              <Route path="/EventEvaluation" element={<EventEvaluation />} />
              <Route path="/AddReport/:id" element={<AddReport />} />
              <Route path="/TrackEvents" element={<TrackEvents />} />
              <Route path="/Calendar" element={<Calendar />} />
              <Route path="/Rooms" element={<Rooms />} />
              <Route path="/Account" element={<Account />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  </Router>
  );
 
}

export default App;
