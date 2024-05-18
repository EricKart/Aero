const express = require('express');
const WeatherData = require('../models/WeatherData');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const weatherData = await WeatherData.find();
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
