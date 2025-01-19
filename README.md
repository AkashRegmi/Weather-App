This project is a Weather App with search option created using React in where one is able to search the weather of any city globally. This calls data from the OpenWeather API that gives an updated weather report and prints basic weather details including temperature (in Celsius), meteorological condition, humidity, wind speed and the type of weather icon respective of the condition which could be clear sky, rain, snow etc. There is also a textinput for entering the city, a button for resetting the data and a loading/bar error state screen for the app. Moreover, the result is the possibility of header height resizing depends on whether the weather data is loaded or not.

The city, weather data, loading state and errors are all created by useState hook and data is fetched when the user submits the city name using useEffect. The icons relating to the weather is information acquired from the API is implemented to the page to ensure that the user is presented with an icon that best represents the prevalent weather. The project shows main concepts of React like state, conditional rendering, and API integration that makes this tool an interactive application for users, to check the weather of any city.


To run the Project 
1) first clone it from my Hithub.
2) Go to the folder Directory by doing cd WEATHER APP in terminal.
3) Agaim, in terminal type  npm run dev 

After this you see the weather App will Start Working