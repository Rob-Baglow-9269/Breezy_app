// components/Weather/Favourites.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Favourites.css';

const Favourites = ({ isLoggedIn }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get('https://breezy-app.onrender.com/api/favourites', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFavourites(res.data);
        } catch (error) {
          console.error('Failed to fetch favourites', error);
        }
      }
    };
    fetchFavourites();
  }, [isLoggedIn]);

  return (
    <div className="favourites-container">
      <h2>Favourites</h2>
      <ul>
        {favourites.map(fav => (
          <li key={fav._id}>{fav.savedCities.map(city => city.cityName).join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
