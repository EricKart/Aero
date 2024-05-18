const axios = require('axios');
const mongoose = require('mongoose');
const WeatherData = require('../models/WeatherData');

mongoose.connect('mongodb://localhost/flight_navigation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const API_KEY = 'your_openweathermap_api_key';
const city = 'London';
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

const fetchWeatherData = async () => {
  try {
    const response = await axios.get(URL);
    const data = response.data;

    const weatherData = new WeatherData({
      city: data.name,
      temperature: data.main.temp,
      weather: data.weather[0].description,
    });

    await weatherData.save();
    console.log('Weather data saved');
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
};

fetchWeatherData();
