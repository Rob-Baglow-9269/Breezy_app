// Home.js
import React from 'react';
import WeatherDisplay from '../components/Weather/WeatherDisplay';
import './Home.css';

const Home = ({ isLoggedIn }) => {
  return (
    <div className="home-container">
      <WeatherDisplay isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Home;
