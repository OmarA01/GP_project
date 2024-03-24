import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch} from "react-router-dom";
import MainPage from './components/MainPage';
import { NavBar } from './components/Navbar';
import AddEvent from './components/AddEvent';
import ViewEvents from './components/ViewEvents';
import TrackEvents from './components/TrackEvents';
import Calendar from './components/Calendar';
import Rooms from './components/Rooms';


function App() {

  return (
    <Router>
      <div className='App'>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" exact Component={MainPage} />
            <Route path="/AddEvent" exact Component={AddEvent} />
            <Route path="/ViewEvents" exact Component={ViewEvents} />
            <Route path="/TrackEvents" exact Component={TrackEvents} />
            <Route path="/Calendar" exact Component={Calendar} />
            <Route path="/Rooms" exact Component={Rooms} />
          </Routes>
        </div>
      </div>
    </Router>
  );
 
}

export default App;
