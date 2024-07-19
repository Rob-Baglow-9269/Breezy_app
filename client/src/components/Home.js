// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Weather App</h1>
      <Link to="/weather">Check Weather</Link>
    </div>
  );
}

export default Home;
