// Weather.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get('/api/weather');
      setWeather(response.data);
    };

    fetchWeather();
  }, []);

  return (
    <div>
      <h1>Weather Information</h1>
      {weather && (
        <div>
          <p>Temperature: {weather.temperature}</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
