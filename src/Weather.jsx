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

  //code aanusar icon fix.
  const weatherIcons = {
    "01d": Clear_icon,
    "01n": Clear_icon,
    "02d": Cloud_icon,
    "02n": Cloud_icon,
    "03d": Cloud_icon,
    "03n": Cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": Snow_icon,
    "13n": Snow_icon,
  };

  //fetching the data from openWeather API
  const fetchWeatherData = async () => {
   
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
      ); 
      if (!weatherData.ok) {
       
        throw new Error("Country/City not found. Please try again !");
      }
      const weatherData1 = await weatherData.json();
      console.log(weatherData1);
      const icon = weatherIcons[weatherData1.weather[0].icon] || Clear_icon;
      console.log(icon);

      setWeatherData(weatherData1);
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

  //User le input greko handel Greko
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

  //reset all the thing
  const handleReset = () => {
    setCity("");
    setWeatherData(null);
    setError("");
  };

  return (
    <>
      <div
        id="header"
        style={{
          height: weatherData ? "auto" : "200px", // Dynamic height based on weatherData
          transition: "height 0.3s ease", // Smooth height transition
        }}
      >
        <h1 className="heading">Weather App</h1>
        <div id="search-bar">
          <form onSubmit={handelSubmit}>
            <input
              type="text"
              value={city}
              placeholder="Enter city here...."
              onChange={handelUserInput}
            />
            <button type="submit">Search</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </form>
          {weatherData && (
            <img
              src={weatherIcons[weatherData.weather[0].icon] || Clear_icon}
              alt="Weather Logo"
              className="logo"
            />
          )}
        </div>

        {loading && (
          <p
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              margin: "10px",
            }}
          >
            Loading.......
          </p>
        )}

        {error && (
          <p
            style={{
              color: "red",
              fontSize: "20px",
              fontWeight: "bold",
              margin: "10px",
            }}
          >
            {error}
          </p>
        )}
        {weatherData && (
          <div style={{ marginTop: "0px" }}>
            <p className="temperature">{weatherData.main.temp}°C</p>
            <h2 className="PlaceName">{weatherData.name}</h2>
            <p className="weather">{weatherData.weather[0].description}</p>

            <div id="Humidity_WindSpeed">
              <div className="col">
                <img src={humidity_icon} alt="humidity logo" />
                <div>
                  <p className="humidity">{weatherData.main.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>

              <div className="col">
                <img src={Wind} alt="Wind logo" />
                <div>
                  <p className="wind-speed">{weatherData.wind.speed} m/s</p>
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
