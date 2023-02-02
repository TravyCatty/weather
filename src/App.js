import React, { useState } from 'react'
import './App.css'
function App() {
  const apiKey = 'f6296ceb552c03aa11d918d6369f030e'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState('')

  const getWeather = (event) => {
    if (event.key == 'Enter') {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data)
          setCity('')
        })
    }
  }

  return (
    <div className="container">
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyDown={getWeather}
        placeholder="Enter City..."
        className="input"
      />

      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p className='welcome'>Welcome Weather App! Enter a city to get weather of.</p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="city">{weatherData.name}</p>
          <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
          <p className="weather">{weatherData.weather[0].main}</p>
        </div>
      )}

      {weatherData.cod === '404' ? <p>City not found</p> : <></>}
    </div>
  )
}

export default App
