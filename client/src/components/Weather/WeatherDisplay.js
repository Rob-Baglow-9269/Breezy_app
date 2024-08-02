import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherDisplay.css';

const WeatherDisplay = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [favourites, setFavourites] = useState([]);

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

  const fetchFavourites = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://breezy-app.onrender.com/api/favourites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setFavourites(res.data);
    } catch (error) {
      alert('Failed to fetch favourites');
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const saveFavourite = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://breezy-app.onrender.com/api/favourites', { username: 'your_username', savedCities: [{ cityName: city }] }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchFavourites();
    } catch (error) {
      alert('Failed to save favourite');
    }
  };

  return (
    <div className="weather-container">
      <div className="form-section">
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
        <button onClick={saveFavourite}>Save</button>
      </div>
      <div className="favourites-container">
        <h2>Favourites</h2>
        {favourites.map((fav, index) => (
          <div key={index} className="favourite-item">
            <h4>{fav.cityName}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
