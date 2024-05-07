import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../api';
// import Forecast from './forecast/forecast' ;

const Weather = () => {

  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {

    const apiKey = WEATHER_API_KEY;

    const loadCurrentWeather = (position) => {
      const { latitude, longitude } = position.coords;

      axios.get(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
        });
    };

    const errorCallback = (error) => {
      setError(error);
      setWeather(false);
    };

    navigator.geolocation.getCurrentPosition(loadCurrentWeather, errorCallback);

  }, []);


  return (

    <div className='weather'>
      {weather ? (

        <div className='top'>
          <h2 className='city'>Weather in {weather.name}, {weather.sys.country}</h2>
          <div>
            <p className='weather-description'>Temperature: {weather.main.temp}°C</p>
            <p className='weather-description'>Weather: {weather.weather[0].main}</p>
          </div>
          <img alt='weather' className='weather-icon' src={`icons/${weather.weather[0].icon}.png`} />
          
        </div>

        


      ) : (
        <p>Loading weather data...</p>
      )}
    </div>

  );
}





export default Weather;