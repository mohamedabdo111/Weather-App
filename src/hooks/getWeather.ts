import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWeatherAction = createAsyncThunk(
  "get/weather",
  async (country: string, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=imperial&appid=3a9745493777502659cf374c6e77603e`
      );
      return res.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error);
    }
  }
);
