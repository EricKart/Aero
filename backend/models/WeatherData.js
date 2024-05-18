const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  weather: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WeatherData', weatherSchema);
