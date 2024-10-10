import React, { ChangeEvent, useEffect, useState } from "react";
import { RootState, useAppDispatch } from "./redux/store";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { getWeatherAction } from "./hooks/getWeather";
const App = () => {
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
  return (
    <main className="app">
      <div className="containerr ">
        <div className="cards">
          <div className="forms">
            <input
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={handleCountry}
            />
            <button onClick={OnSubminBtn} type="button">
              Search
            </button>
          </div>

          {/* data */}
          {!isLoading && weathers.cod === 200 ? (
            <div>
              <div className="details">
                <div>
                  <p className="name">{weathers.name}</p>
                  <h1 className="bold">
                    {convertToCelsius(weathers.main.temp)}°C
                  </h1>
                </div>
                <h4 className="weather">{weathers.weather[0].main}</h4>
              </div>
              {/*  seconed dev*/}
              <div className="weather-conditions">
                <div className="text-center">
                  <h4 className=" fontstyle"> Feels Like</h4>
                  <h4 className="fontstyle">
                    {convertToCelsius(weathers.main.feels_like)}°C
                  </h4>
                </div>
                <div className="text-center">
                  <h4 className=" fontstyle">Humidity </h4>
                  <h4 className="fontstyle">
                    {weathers.main.humidity.toFixed()}%
                  </h4>
                </div>
                <div className="text-center">
                  <h4 className=" fontstyle">Wind Speed</h4>
                  <h4 className="fontstyle">
                    {weathers.wind.speed.toFixed()}MPH
                  </h4>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Toaster></Toaster>
    </main>
  );
};

export default App;
