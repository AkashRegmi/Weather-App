
import React, { useEffect, useState } from "react";
import "./component/weather1.css";
import Clear_icon from "./component/images/clear.png";
import Cloud_icon from "./component/images/cloud.png";
import drizzle_icon from "./component/images/drizzle.png";
import humidity_icon from "./component/images/humidity.png";
import rain_icon from "./component/images/rain.png";
import Snow_icon from "./component/images/snow.png";
import Wind from "./component/images/Wind.png";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

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

  const fetchWeatherData = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      ); 
      if (!response.ok) {
        throw new Error("City not found. Please try again!");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  
  }, []);

  const handleUserInput = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const handleReset = () => {
    setCity("");
    setWeatherData(null);
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="weather-app">
      <div className={`weather-container ${weatherData ? "expanded" : ""}`}>
        <h1 className="app-title">Weather Forecast</h1>
        
        <div className="search-container">
          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="text"
              value={city}
              placeholder="Enter city name..."
              onChange={handleUserInput}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            <div className="button-group">
              <button type="submit" className="search-button">
                Search
              </button>
              <button 
                type="button" 
                onClick={handleReset}
                className="reset-button"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {weatherData && (
          <div className="weather-display">
            <div className="weather-header">
              <h2 className="city-name">{weatherData.name}, {weatherData.sys?.country}</h2>
              <p className="weather-description">
                {weatherData.weather[0].description}
              </p>
            </div>

            <div className="weather-main">
              <div className="temperature-container">
                <img 
                  src={weatherIcons[weatherData.weather[0].icon] || Clear_icon} 
                  alt="Weather icon" 
                  className="weather-icon"
                />
                <p className="temperature">
                  {Math.round(weatherData.main.temp)}°C
                </p>
              </div>
              
              <div className="weather-details">
                <div className="detail-item">
                  <img src={humidity_icon} alt="Humidity" className="detail-icon" />
                  <div className="detail-text">
                    <span className="detail-value">{weatherData.main.humidity}%</span>
                    <span className="detail-label">Humidity</span>
                  </div>
                </div>

                <div className="detail-item">
                  <img src={Wind} alt="Wind speed" className="detail-icon" />
                  <div className="detail-text">
                    <span className="detail-value">{weatherData.wind.speed} m/s</span>
                    <span className="detail-label">Wind Speed</span>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Feels Like:</span>
                  <span className="detail-value">{Math.round(weatherData.main.feels_like)}°C</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Pressure:</span>
                  <span className="detail-value">{weatherData.main.pressure} hPa</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;