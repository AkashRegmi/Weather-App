import React from "react";

function Weather() {
  // const fetchWeatherData = async () => {
  //   try {
  //     const weatherData = await fetch(
  //       "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={process.env,"
  //     );
  //     const weatherData1 = await weatherData.json();

  //     console.log(weatherData1);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  try {
    console.log(import.meta.env.VITE_APP_WEATHER_API_KEY)
  } catch (error) {
    console.log(error);
  }
  
  return (
    <div>
      <div id="header">
        <h1>Weather App</h1>
        <input type="text" placeholder="Enter City Name......" />
        <input type="submit" value="Search" />
      </div>
    </div>
  );
}
export default Weather;
