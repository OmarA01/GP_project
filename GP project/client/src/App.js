import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from "react";
import MainPage from './components/MainPage';
import { NavBar } from './components/Navbar';
import AddEvent from './components/AddEvent';
import ViewEvents from './components/ViewEvents';
import TrackEvents from './components/TrackEvents';
import Calendar from './components/Calendar';
import Rooms from './components/Rooms';
import Login from './components/Login';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const handleLogin = () => {
    // logic 
    setIsLoggedIn(true);
  };

  return (
    <Router>
    <div className='App'>
      {isLoggedIn && <NavBar />}
      <div>
        <Routes>
          {!isLoggedIn && <Route path="/" element={<Login onLogin={handleLogin} />} />}
          {isLoggedIn && (
            <>
              <Route path="/" element={<MainPage />} />
              <Route path="/AddEvent" element={<AddEvent />} />
              <Route path="/ViewEvents" element={<ViewEvents />} />
              <Route path="/TrackEvents" element={<TrackEvents />} />
              <Route path="/Calendar" element={<Calendar />} />
              <Route path="/Rooms" element={<Rooms />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  </Router>
  );
 
}

export default App;
