import { createSlice } from "@reduxjs/toolkit";
import { Iprops } from "../../interfaces/inedx";
import { getWeatherAction } from "../../hooks/getWeather";

const initialState: Iprops = {
  weathers: {
    name: "",
    cod: 0,
    main: {
      temp: 0,
      feels_like: 0,
      humidity: 0,
    },
    wind: {
      speed: 0,
    },
    weather: [
      {
        main: "",
      },
    ],
  },
  isLoading: true,
  error: null,
};

const WeatehrSlice = createSlice({
  name: "getWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWeatherAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.weathers = action.payload;
      })
      .addCase(getWeatherAction.rejected, (state, action) => {
        state.isLoading = false;
        state.weathers = {
          name: "",
          cod: 0,
          main: {
            temp: 0,
            feels_like: 0,
            humidity: 0,
          },
          wind: {
            speed: 0,
          },
          weather: [
            {
              main: "",
            },
          ],
        };
        state.error = action.payload;
      });
  },
});

export default WeatehrSlice.reducer;
