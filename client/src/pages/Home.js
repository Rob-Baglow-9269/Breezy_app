import React from 'react';
import WeatherDisplay from '../components/Weather/WeatherDisplay';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <WeatherDisplay />
    </div>
  );
};

export default Home;
