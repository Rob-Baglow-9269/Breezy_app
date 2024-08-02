import React, { useState } from 'react';
import axios from 'axios';
import './WeatherDisplay.css'

const WeatherDisplay = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`https://breezy-app.onrender.com/api/weather?city=${city}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setWeather(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please log in.');
      } else {
        alert('Failed to fetch weather data');
      }
    }
  };

  return (
    <div className="weather-container">
      <form onSubmit={fetchWeather}>
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <button type="submit">Get Weather</button>
      </form>
      {weather && (
        <div className="weather-info">
          <h3>Weather in {weather.city}, {weather.country}</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
