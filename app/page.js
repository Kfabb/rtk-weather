'use client'
import React from 'react';
import { Provider } from 'react-redux';
import store from "app/redux/store.js";
import WeatherApp from "./components/WeatherApp.js";

export default function Home() {
  return (
    <Provider store={store}>
      <WeatherApp/>
    </Provider>
  )
}
