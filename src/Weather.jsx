import React, { useEffect, useState } from "react";
import "./component/weather.css";
import Clear_icon from "./component/images/clear.png";
import Cloud_icon from "./component/images/cloud.png";
import drizzle_icon from "./component/images/drizzle.png";
import humidity_icon from "./component/images/humidity.png";
import rain_icon from "./component/images/rain.png";
import Snow_icon from "./component/images/snow.png";
import Image_icon from "./component/images/images.png";
import Wind from "./component/images/Wind.png";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // import.meta.env.VITE_APP_WEATHER_API_KEY
  const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeatherData = async () => {
    // console.log("Fetching weather data"+API_KEY);
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);
    try {
      const weatherData = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      ); //import.meta.env.VITE_APP_WEATHER_API_KEY
      if (!weatherData.ok) {
        throw new Error("City not found. Please try again.");
      }
      const weatherData1 = await weatherData.json();
      setWeatherData(weatherData1);
      console.log(weatherData1);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handelUserInput = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setCity(e.target.value);
  };
  //Handel when submit button is Clicked
  const handelSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <>
      <div id="header">
        <h1 class="heading">Weather App</h1>
        <div id="search-bar">
          <form onSubmit={handelSubmit}>
            <input
              type="text"
              value={city}
              placeholder="Enter city here...."
              onChange={handelUserInput}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {loading && <p>Loading...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}
        {weatherData && (
          <div style={{ marginTop: "20px" }}>
            <h2>{weatherData.name}</h2>
            <p class="temperature">
              <strong>Temperature:</strong> {weatherData.main.temp}°C
            </p>
            <p class="weather">
              <strong>Weather:</strong> {weatherData.weather[0].description}
            </p>

            <div id="Humidity_WindSpeed">
              <div class="col">
                <img src={humidity_icon} alt="humidity logo" />
                <div>
                  <p class="humidity">{weatherData.main.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>

              <div class="col">
                <img src={Wind} alt="Wind logo" />
                <div>
                  <p class="wind-speed">{weatherData.wind.speed} m/s</p>
                  <span>Wind Speed</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Weather;
