// components/Weather/WeatherDisplay.js
import React, { useState } from 'react';
import axios from 'axios';
import './WeatherDisplay.css';
import Favourites from './Favourites';

const WeatherDisplay = ({ isLoggedIn }) => {
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
      if (error.response) {
        if (error.response.status === 401) {
          alert('Unauthorized. Please log in.');
        } else if (error.response.status === 404) {
          alert('City not found. Please check the city name and try again.');
        } else if (error.response.status >= 500) {
          alert('Server error. Please try again later.');
        } else {
          alert('Failed to fetch weather data. Please check your request and try again.');
        }
      } else if (error.request) {
        alert('No response received from server. Please check your network connection and try again.');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const saveFavourite = async () => {
    if (weather && isLoggedIn) {
      try {
        const token = localStorage.getItem('token');
        await axios.post('https://breezy-app.onrender.com/api/favourites', {
          username: localStorage.getItem('username'),
          savedCities: [{ cityName: weather.city }]
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('City saved to favourites!');
      } catch (error) {
        console.error('Failed to save favourite', error);
        alert('Failed to save favourite');
      }
    }
  };

  return (
    <div className="weather-container">
      <div className="favourites-wrapper">
        <Favourites isLoggedIn={isLoggedIn} />
      </div>
      <div className="weather-display">
        <form onSubmit={fetchWeather}>
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <button type="submit">Get Weather</button>
          {weather && (
            <button type="button" onClick={saveFavourite}>Save</button>
          )}
        </form>
        {weather && (
          <div className="weather-info">
            <h3>Weather in {weather.city}, {weather.country}</h3>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Condition: {weather.condition}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDisplay;
