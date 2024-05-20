const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("front"));

app.get("/api/flights", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATION_STACK_API_KEY}`
    );
    res.json(response.data);
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
