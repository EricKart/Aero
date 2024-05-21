import React, { useState } from "react";
import axios from "axios";

const WeatherGov = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [forecastData, setForecastData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/weather-gov?lat=${latitude}&lon=${longitude}`);
      setForecastData(response.data);
    } catch (error) {
      console.error("Error fetching Weather.gov data:", error);
    }
  };

  return (
    <div>
      <h1>Weather.gov Data</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <label>
          Longitude:
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <button type="submit">Get Forecast</button>
      </form>
      {forecastData && (
        <div>
          {forecastData.map((period, index) => (
            <div key={index}>
              <h2>{period.name}</h2>
              <p>Temperature: {period.temperature} {period.temperatureUnit}</p>
              <p>Wind: {period.windSpeed} {period.windDirection}</p>
              <p>Forecast: {period.shortForecast}</p>
              <p>Details: {period.detailedForecast}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherGov;
