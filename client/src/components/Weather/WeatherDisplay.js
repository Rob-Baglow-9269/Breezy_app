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
        alert('Failed to fetch weather data. Please check your request.');
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
      console.error('Failed to fetch favourites', error);
    }
  };

  const fetchFavouriteWeathers = async () => {
    try {
      const token = localStorage.getItem('token');
      const weatherPromises = favourites.map(fav => 
        axios.get(`https://breezy-app.onrender.com/api/weather?city=${fav.savedCities[0].cityName}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      );
      const weatherResults = await Promise.all(weatherPromises);
      setFavouriteWeathers(weatherResults.map(res => res.data));
    } catch (error) {
      console.error('Failed to fetch favourite weathers', error);
    }
  };

  const addFavourite = async () => {
    if (!city || favourites.some(fav => fav.savedCities[0].cityName === city)) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://breezy-app.onrender.com/api/favourites', { username: 'currentUser', savedCities: [{ cityName: city }] }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchFavourites();
    } catch (error) {
      console.error('Failed to add favourite', error);
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-input">
        <form onSubmit={fetchWeather}>
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <button type="submit">Get Weather</button>
          <button type="button" onClick={addFavourite}>Save</button>
        </form>
      </div>
      {weather && (
        <div className="weather-info">
          <h3>Weather in {weather.city}, {weather.country}</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
      <div className="favourites-container">
        <h3>Favourites</h3>
        {favouriteWeathers.map((favWeather, index) => (
          <div key={index} className="favourite-weather">
            <h4>{favWeather.city}, {favWeather.country}</h4>
            <p>Temperature: {favWeather.temperature}°C</p>
            <p>Condition: {favWeather.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
