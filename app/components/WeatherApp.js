'use client'


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherData, setCity } from "app/redux/weatherSlice.js";

function WeatherApp(){
  const dispatch = useDispatch;
  const { city, weatherData, loading, error } = useSelector((state) => state.weather);
  const [inputCity, setInputCity] = useState(city);

  useEffect(() => {
    if (city) {
      dispatch(fetchWeatherData(city))
    }
  }, [city, dispatch]);

  const handleInputChange = (e) => {setInputCity(e.target.value);};

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setCity(inputCity));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputCity}
          onChange={handleInputChange}
          placeholder="Enter City"/>
          <button type="submit">Get Weather</button>
      </form>
    </div>
  )
}

export default WeatherApp