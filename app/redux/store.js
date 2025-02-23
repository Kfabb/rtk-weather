import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "app/redux/weatherSlice.js";



const store = configureStore({
  reducer: {
    weather: weatherReducer
  }
})

export default store; 