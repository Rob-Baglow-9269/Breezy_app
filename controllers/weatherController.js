const axios = require('axios');
const mongoose = require('mongoose');
const Weather = require('../models/Weather'); // Correct path to the Weather model

// MongoDB connection
mongoose.connect('mongodb+srv://syedarimmsha21:fUzqurEwf3hHBvvU@cluster0.15d33wu.mongodb.net/Breezy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const getWeather = async (req, res) => {
  try {
    const city = req.query.city || 'London'; // Optionally get city from query parameters, default to London
    const apiKey = process.env.WEATHER_API_KEY;

    // Check if we have recent weather data for the city in the database
    const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000);
    let weatherData = await Weather.findOne({ city: city.toLowerCase(), updatedAt: { $gte: oneHourAgo } });

    if (!weatherData) {
      // If no recent data, fetch from API
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Use metric units for temperature in Celsius

      // Logging the API URL and API key (be careful with logging sensitive information in production)
      console.log(`Fetching weather data from URL: ${url}`);
      console.log(`Using API key: ${apiKey}`);

      const response = await axios.get(url);
      
      // Logging the response data
      console.log('Weather API response data:', response.data);

      weatherData = response.data;

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
    }

    res.json({
      temperature: weatherData.main.temp,
      condition: weatherData.weather[0].description,
      city: weatherData.name,
      country: weatherData.sys.country,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { getWeather };
