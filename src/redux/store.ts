import { configureStore } from "@reduxjs/toolkit";
import WeatehrSlice from "./Slice/getWeatherSlice";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    getWeather: WeatehrSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
