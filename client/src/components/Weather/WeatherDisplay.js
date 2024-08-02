import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherDisplay.css';

const WeatherDisplay = ({ isLoggedIn }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [favouriteWeathers, setFavouriteWeathers] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchFavourites();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (favourites.length > 0) {
      fetchFavouriteWeathers();
    }
  }, [favourites]);

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
      } else if (error.response && error.response.status === 500) {
        alert('Server error. Please try again later.');
      } else {
        alert('Failed to fetch weather data. Please check the city name and try again.');
      }
    }
  };

  const saveFavourite = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://breezy-app.onrender.com/api/favourites',
        { username: 'your_username', savedCities: [{ cityName: city }] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchFavourites();
    } catch (error) {
      alert('Failed to save favourite.');
    }
  };

  const fetchFavourites = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://breezy-app.onrender.com/api/favourites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavourites(res.data);
    } catch (error) {
      alert('Failed to fetch favourites.');
    }
  };

  const fetchFavouriteWeathers = async () => {
    const token = localStorage.getItem('token');
    const weatherDataPromises = favourites.map(fav =>
      axios.get(`https://breezy-app.onrender.com/api/weather?city=${fav.savedCities[0].cityName}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    );
    try {
      const weatherDataResponses = await Promise.all(weatherDataPromises);
      const weatherData = weatherDataResponses.map(response => response.data);
      setFavouriteWeathers(weatherData);
    } catch (error) {
      alert('Failed to fetch weather data for favourites.');
    }
  };

  return (
    <div className="weather-main-container">
      <div className="favourites-container">
        <h2>Favourites</h2>
        {favouriteWeathers.map((favWeather, index) => (
          <div key={index} className="favourite-weather-info">
            <h3>Weather in {favWeather.city}, {favWeather.country}</h3>
            <p>Temperature: {favWeather.temperature}°C</p>
            <p>Condition: {favWeather.condition}</p>
          </div>
        ))}
      </div>
      <div className="weather-container">
        <form onSubmit={fetchWeather}>
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <button type="submit">Get Weather</button>
          <button type="button" onClick={saveFavourite}>Save</button>
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
