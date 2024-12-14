import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useCallback } from 'react';
import './App.css';

export function Api(city){
  const apiKey = 'd2cf8c474c0287428574ff6a4d643699'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  return axios.get(apiUrl);
}

function App() {
  const [city, setCity] = useState(''); 
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchData = useCallback(() => {
    Api(city)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [city]);


  return (
    <div>
      <div className='search'>
        <TextField id="outlined-basic" variant="outlined" value={city} onChange={handleCityChange} sx={{ bgcolor: "white" }}/>
        <Button variant="contained" color="primary" onClick={fetchData}>Search</Button>
      </div>

    <div className="App">
      <div>
      {weatherData && (
        <div>
          <h1>{weatherData.name}, {weatherData.sys.country}</h1>
          <h1>{weatherData.main.temp}°C</h1>
          <p>{weatherData.weather[0].description}</p>

          <div className='weather-info'>
            <div className='weather-item'>
              <h3>Humidity</h3>
              <p className='value'>{weatherData.main.humidity}%</p>
            </div>

            <div className='weather-item'>
              <h3>Wind</h3>
              <p className='value'>{weatherData.wind.speed} Km/h</p>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
   </div>
  );
}
export default App;
