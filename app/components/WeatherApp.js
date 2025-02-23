"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherData, setCity } from "app/redux/weatherSlice.js";
import WeatherChart from "./WeatherChart";

function WeatherApp() {
  const dispatch = useDispatch();
  const { city, weatherData, loading, error } = useSelector(
    (state) => state.weather
  );
  const [inputCity, setInputCity] = useState(city);

  useEffect(() => {
    if (city) {
      dispatch(fetchWeatherData(city));
    }
  }, [city, dispatch]);

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setCity(inputCity));
    setInputCity('')
  };

  if (loading) return <p className="loading">Fetching weather data for {city}...</p>;
  if (error) return <p className="error">Failed to fetch weather data for {city} {error}</p>;

   const temperatureData = weatherData
     ? weatherData.list.map((item) => {
        console.log(item)
         const celsius = item.main.temp
         const fahrenheit = (celsius * (9 / 5) + 32); // Convert Celsius to Fahrenheit
         
         return fahrenheit
       })
     : [];
  const pressureData = weatherData
    ? weatherData.list.map((item) => item.main.pressure)
    : [];
  const humidityData = weatherData
    ? weatherData.list.map((item) => item.main.humidity)
    : [];
    
  return (
    <>
      <h1 className="heading">Weather Data</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputCity}
          onChange={handleInputChange}
          placeholder="Enter City"
        />
        <button className="btn" type="submit">
          Get Weather
        </button>
      </form>

      {weatherData && (
        <>
          <div className="content">
            <div className="chartsDiv">
              <WeatherChart
                data={temperatureData}
                title="Temperature"
                units="°F"
                color="red"
              />

              <WeatherChart
                data={pressureData}
                title="Pressure"
                units="hPa"
                color="blue"
              />
              <WeatherChart
                data={humidityData}
                title="Humidity"
                units="%"
                color="green"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default WeatherApp;
