import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getWeatherAction } from "../hooks/getWeather";
import { RootState, useAppDispatch } from "../redux/store";
interface Iprops {
  country: string;
  handleCountry: (e: ChangeEvent<HTMLInputElement>) => void;
  OnSubminBtn: () => Promise<void>;
  convertToCelsius: (val: number) => string;
  weathers: any;
  isLoading: boolean;
}
const GetWeatherHook = (): Iprops => {
  const dispatch = useAppDispatch();
  const [country, setCountry] = useState("");
  const handleCountry = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  // on Click
  const OnSubminBtn = async () => {
    if (country === "") {
      return;
    }
    await dispatch(getWeatherAction(country));
  };

  const { weathers, isLoading, error } = useSelector(
    (item: RootState) => item.getWeather
  );

  // to calculate the correct degres
  const convertToCelsius = (tempF: number) => {
    return ((tempF - 32) * (5 / 9)).toFixed(1); // Round to 1 decimal place
  };

  // handle error
  useEffect(() => {
    if (isLoading === false) {
      if (error?.status === 404) {
        toast.error("city not found");
      }
    }
  }, [isLoading]);

  return {
    handleCountry,
    country,
    OnSubminBtn,
    convertToCelsius,
    weathers,
    isLoading,
  };
};

export default GetWeatherHook;
