import React, { useEffect, useState } from "react";

function Weather() {
  const [city, setCity] = useState("Kathmandu");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const weatherData = await fetch(
        "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=be608e6f8600cb747f0a56d16dfc2d21"
        // be608e6f8600cb747f0a56d16dfc2d21
      );//import.meta.env.VITE_APP_WEATHER_API_KEY
      const weatherData1 = await weatherData.json();
      setWeatherData(weatherData1)
      console.log(weatherData1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchWeatherData();
  },[]);

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
    <div>
      <div id="header">
        <h1>Weather App</h1>
        <form onSubmit={handelSubmit}>
          <input
            type="text"
            value={city}
            placeholder="Enter city here...."
            onChange={handelUserInput}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
}
export default Weather;
