const axios = require('axios');
const mongoose = require('mongoose');
const Weather = require('../models/Weather');

// MongoDB connection (if not already connected)
// mongoose.connect('mongodb+srv://username:password@cluster0.mongodb.net/Breezy', { useNewUrlParser: true, useUnifiedTopology: true });

const getWeather = async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000);
    let weatherData = await Weather.findOne({ city: city.toLowerCase(), updatedAt: { $gte: oneHourAgo } });

    if (weatherData) {
      console.log('Using cached weather data');
      return res.json({
        temperature: weatherData.temperature,
        condition: weatherData.condition,
        city: weatherData.city,
        country: weatherData.country,
      });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    weatherData = response.data;

    if (!weatherData || !weatherData.main || !weatherData.main.temp) {
      return res.status(500).json({ error: 'Invalid weather data received' });
    }

    // Save or update the weather data in the database
    await Weather.findOneAndUpdate(
      { city: city.toLowerCase() },
      {
        temperature: weatherData.main.temp,
        condition: weatherData.weather[0].description,
        city: weatherData.name,
        country: weatherData.sys.country,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({
      temperature: weatherData.main.temp,
      condition: weatherData.weather[0].description,
      city: weatherData.name,
      country: weatherData.sys.country,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { getWeather };
