import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherDisplay.css';

const WeatherDisplay = ({ isLoggedIn }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchFavourites();
    }
  }, [isLoggedIn]);

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

  const saveFavourite = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://breezy-app.onrender.com/api/favourites', {
        username: 'testuser', // Replace with actual username from context or state if available
        savedCities: [{ cityName: city }]
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('City saved to favourites!');
      fetchFavourites(); // Refresh favourites list
    } catch (error) {
      console.error('Failed to save favourite', error);
      alert('Failed to save favourite city.');
    }
  };

  return (
    <div className="weather-container">
      <form onSubmit={fetchWeather}>
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <button type="submit">Get Weather</button>
        {weather && (
          <button type="button" onClick={saveFavourite}>Save to Favourites</button>
        )}
      </form>
      {weather && (
        <div className="weather-info">
          <h3>Weather in {weather.city}, {weather.country}</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
      {isLoggedIn && favourites.length > 0 && (
        <div className="favourites-list">
          <h3>Favourites</h3>
          <ul>
            {favourites.map((fav) => (
              <li key={fav._id}>{fav.savedCities.map(city => city.cityName).join(', ')}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
