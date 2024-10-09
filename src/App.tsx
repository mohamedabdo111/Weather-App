import { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
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
      <Container className="col-12 col-md-7 ">
        <div className="card w-100 p-4 bg-transparent border-white text-white">
          <div className="text-center d-block d-md-flex gap-3">
            <input
              type="text"
              className=" input-group-text w-100 text-start m-auto bg-transparent text-white"
              placeholder="Enter Country"
              value={country}
              onChange={handleCountry}
            />
            <Button
              className={`bg-transparent border-white w-100 mt-2 mt-md-0 fw-bold ${
                country === "" ? "disabled" : null
              }`}
              onClick={OnSubminBtn}
            >
              Search
            </Button>
          </div>

          {/* data */}
          {!isLoading && weathers.cod === 200 ? (
            <Row>
              <Col
                sm="12"
                className=" d-flex  align-items-center justify-content-between mt-5"
              >
                <div>
                  <p className=" fw-bold fs-4 m-0">{weathers.name}</p>
                  <h1 className="fw-bold  ">
                    {convertToCelsius(weathers.main.temp)}°C
                  </h1>
                </div>
                <h4 className="weather">{weathers.weather[0].main}</h4>
              </Col>
              <Col
                sm="12"
                className="rounded-3 d-flex flex-wrap  p-3 justify-content-evenly align-items-center gap-4 mt-5"
              >
                <div className="text-center">
                  <h4 className=" fs-5 fw-bold"> Feels Like</h4>
                  <h4 className="fw-bold">
                    {convertToCelsius(weathers.main.feels_like)}°C
                  </h4>
                </div>
                <div className="text-center">
                  <h4 className=" fs-5 fw-bold">Humidity </h4>
                  <h4 className="fw-bold">
                    {weathers.main.humidity.toFixed()}%
                  </h4>
                </div>
                <div className="text-center">
                  <h4 className=" fs-5 fw-bold">Wind Speed</h4>
                  <h4 className="fw-bold">
                    {weathers.wind.speed.toFixed()}MPH
                  </h4>
                </div>
              </Col>
            </Row>
          ) : null}
        </div>
      </Container>
      <Toaster></Toaster>
    </main>
  );
};

export default App;
