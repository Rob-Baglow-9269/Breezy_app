// components/Weather/Favourites.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Favourites.css';

const Favourites = ({ isLoggedIn }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchFavourites();
    }
  }, [isLoggedIn]);

  const fetchFavourites = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://breezy-app.onrender.com/api/favourites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const favouriteCities = res.data;
      const weatherData = await Promise.all(
        favouriteCities.map(async (fav) => {
          const weatherRes = await axios.get(`https://breezy-app.onrender.com/api/weather?city=${fav.savedCities[0].cityName}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          return {
            city: fav.savedCities[0].cityName,
            weather: weatherRes.data
          };
        })
      );
      setFavourites(weatherData);
    } catch (error) {
      console.error('Failed to fetch favourites', error);
    }
  };

  return (
    <div className="favourites-container">
      <h2>Favourites</h2>
      {favourites.map((fav, index) => (
        <div key={index} className="favourite">
          <h3>{fav.city}</h3>
          {fav.weather && (
            <div className="favourite-weather">
              <p>Temperature: {fav.weather.temperature}°C</p>
              <p>Condition: {fav.weather.condition}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Favourites;
