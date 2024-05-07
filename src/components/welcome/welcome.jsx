import React, { useState, useEffect } from "react";
import "./welcome.css";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../../api.js";
import Search from "../search/search.jsx";
import CurrentWeather from "../currentWeather/currentWeather.jsx";
import Forecast from "../forecast/forecast.jsx";
import Weather from "../onload-current-weather.js";

const Welcome = () => {
  // const [currentDateTime] = useState(new Date().get())

  // const [day, setDay] = useState(getDate())

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(latitude, longitude);
    });
  }, []);

  const fetchWeatherData = (lat, lon) => {
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: weatherResponse.name, ...weatherResponse });
        setForecast({ city: weatherResponse.name, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  const handleOnSearchChange = ({ label, value }) => {
    const [lat, lon] = value.split(" ");
    fetchWeatherData(lat, lon);
  };
  return (
    <section className="welcomePage">
      <div className="weatherContainer container">
        <Search onSearchChange={handleOnSearchChange} />

        <div className="Welcome">
          <h1>Welcome to Weather Forecast App!</h1>
          <h3>Search for cities around you!</h3>
        </div>

        {/* <div className='top'>
                <p>{currentDateTime.toLocaleString()}</p>
               
            </div> */}


        {currentWeather && forecast && (
          <>
            <CurrentWeather data={currentWeather} />
            <Forecast data={forecast} />
          </>
        )}
      </div>
      
    </section>
  );
};

export default Welcome;
