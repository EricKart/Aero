const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/flights", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATION_STACK_API_KEY}`
    );
    const flights = response.data.data.map((flight) => ({
      airline: flight.airline.name,
      flightNumber: flight.flight.iata,
      departure: `${flight.departure.airport} (${flight.departure.iata})`,
      arrival: `${flight.arrival.airport} (${flight.arrival.iata})`,
      status: flight.flight_status,
    }));
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/api/weather", async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
    };
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/api/nasa", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
    );
    const nasaData = {
      title: response.data.title,
      date: response.data.date,
      explanation: response.data.explanation,
      url: response.data.url,
      media_type: response.data.media_type,
    };
    res.json(nasaData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/api/edl", async (req, res) => {
  try {
    const response = await axios.get(
      "https://your-correct-edl-api-endpoint.com/data",
      {
        headers: {
          Authorization: `Bearer ${process.env.EDL_TOKEN}`,
        },
      }
    );
    const edlData = response.data;
    res.json(edlData);
  } catch (error) {
    console.error(
      "Error fetching EDL data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Server Error");
  }
});

app.get('/api/weather-gov', async (req, res) => {
  const { lat, lon } = req.query;
  const {gridX, gridY} = req.query;
  try {
      const pointResponse = await axios.get(`https://api.weather.gov/points/${lat},${lon}`, {
          headers: {
              'User-Agent': process.env.USER_AGENT
          }
      });
      const gridResponse = await axios.get(`https://api.weather.gov/gridpoints/{office}/${gridX},${gridY}/forecast`,{
        headers:{
          'User-Agent': process.env.USER_AGENT
        }
        });
      const forecastUrl = pointResponse.data.properties.forecast;
      const forecastResponse = await axios.get(forecastUrl, {
          headers: {
              'User-Agent': process.env.USER_AGENT
          }
      });
      const forecastData = forecastResponse.data.properties.periods.map(period => ({
          name: period.name,
          temperature: period.temperature,
          temperatureUnit: period.temperatureUnit,
          windSpeed: period.windSpeed,
          windDirection: period.windDirection,
          shortForecast: period.shortForecast,
          detailedForecast: period.detailedForecast
      }));
      res.json(forecastData);
  } catch (error) {
      console.error('Error fetching Weather.gov data:', error.response ? error.response.data : error.message);
      res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
