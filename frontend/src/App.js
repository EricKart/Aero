import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Flights from "./components/Flights";
import Weather from "./components/Weather";
import Nasa from "./components/Nasa";
import Edl from "./components/Edl";
import WeatherGov from "./components/WeatherGov";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/flights">Flights</Link>
            </li>
            <li>
              <Link to="/weather">Weather</Link>
            </li>
            <li>
              <Link to="/nasa">NASA</Link>
            </li>
            <li>
              <Link to="/edl">EDL</Link>
            </li>
            <li>
              <Link to="/weather-gov">Weather.gov</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/flights" element={<Flights />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/nasa" element={<Nasa />} />
          <Route path="/edl" element={<Edl />} />
          <Route path="/weather-gov" element={<WeatherGov />} />
          <Route
            path="/"
            element={
              <div>
                <h1>Welcome to the API Dashboard</h1>
                <p>Select an API from the navigation menu to see the data.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
