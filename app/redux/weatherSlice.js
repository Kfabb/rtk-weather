import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API;
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeatherData = createAsyncThunk('weather/fetchWeatherData',
async (ctiy) => {
  try {
    const apiURL = `${API_URL}?Q=${city}&appid=${API_KEY}&units=metric`;
    console.log('Fetching weather data from:', apiURL);

    const response = await fetch(apiURL);

    if(!response.ok) {
      throw new Error (`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(error.message)
  }})

  const initialState = {
    city: '',
    weatherData: null,
    loading: false,
    error: null
  }

  const weatherSlice = createSlice({
    name: "weather",
    initialState: {
      city: "",
      weatherData: null,
      loading: false,
      error: null,
    },
    reducers: {
      setCity: (state, action) => {
        state.city = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchWeatherData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchWeatherData.fulfilled, (state, action) => {
          state.loading = false;
          state.weatherData = action.payload;
        })
        .addCase(fetchWeatherData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;