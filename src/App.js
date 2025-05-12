import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useCallback } from 'react';
import './App.css';

export function Api(city){
  const apiKey = 'd2cf8c474c0287428574ff6a4d643699'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  return Promise.all([axios.get(apiUrl), axios.get(apiUrl2)]);
}

function App() {
  const [city, setCity] = useState(''); 
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchData = useCallback(() => {
    Api(city)
      .then(response => {
        setWeatherData(response.data);
        setForecast(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [city]);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date * 1000).toLocaleDateString('en-US', options);
  };


  return (
    <div className='App'>
      <div className='search'>
        <TextField id="outlined-basic" variant="outlined" value={city} onChange={handleCityChange} sx={{ bgcolor: "white" }}/>
        <Button variant="contained" color="primary" onClick={fetchData}>Search</Button>
      </div>

    <div>
      {weatherData && (
        <div className='current-weather'>
          <p style={{fontSize: "50px", marginBottom: "0px"}}>{weatherData.main.temp}°C</p>
          <p style={{fontSize: "50px", marginBottom: "0px", textTransform: "capitalize"}}>{weatherData.weather[0].description}</p>
          <p style={{fontSize: "50px", marginBottom: "0px"}}>{weatherData.name}, {weatherData.sys.country}</p>
        </div>
      )}
    </div>

    <div className='parent'>
      <div className='highlights-forecast'>
        <div><p style={{fontSize: "30px", marginBottom: "0px"}}>Today's Highlights</p></div>

        <div className='highlight'>
          <div className='highlight-info'>
            <div><img src={`https://img.icons8.com/?size=100&id=EWjiSSGn5H9O&format=png&color=1A1A1A`} style={{width: "40px", height: "40px"}} /></div>

            <div className='info1'>
              <p style={{fontSize: "20px", marginBottom: "0px"}}>Wind</p>
              {weatherData && <p style={{fontSize: "20px", marginBottom: "0px"}}>{weatherData.wind.speed} m/s</p>}
            </div>

            <div><img src={`https://img.icons8.com/?size=100&id=LDpqdHkI9ueq&format=png&color=1A1A1A`} style={{width: "40px", height: "40px"}} /></div>

            <div className='info1'>
              <p style={{fontSize: "20px", marginBottom: "0px"}}>Humidity</p>
              {weatherData && <p style={{fontSize: "20px", marginBottom: "0px"}}>{weatherData.main.humidity} %</p>}
            </div>
          </div>
        </div>

        <div className='forecast'>
          <p style={{fontSize: "30px", marginBottom: "0px"}}>5-Day Forecast</p>

          <div className="forecast-row">
            {forecast && forecast.list.map((item, index) => (
              <div className="forecast-item" key={index}>
                <p style={{fontSize: "20px", marginBottom: "0px"}}>{formatDate(item.dt)}</p>
                <p style={{fontSize: "20px", marginBottom: "0px"}}>{item.main.temp}°C</p>
                <p style={{ fontSize: "20px", textTransform: "capitalize" }}></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}
export default App;
