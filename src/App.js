import axios from 'axios';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [place, setPlace] = useState("");
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const showPlace = async (abc) => {
    const newPlace = abc;
    setPlace(newPlace);
    setInput("");
    try {
      const apiKey=process.env.REACT_APP_API_KEY;
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${newPlace}&appid=${apiKey}&units=metric`);
      setWeather(response.data);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Cannot fetch");
      setWeather(null);
    }
  };

  const changeInput = (abc) => {
    setInput(abc);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      showPlace(input);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-5">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-transform transform hover:scale-105">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Weather App</h1>
        <input
          type="text"
          placeholder="Enter a place"
          value={input}
          onChange={(e) => changeInput(e.target.value)}
          onKeyDown={(e) => handleKey(e)}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          onClick={() => { showPlace(input) }}
          className="mt-2 bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        
        {weather && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Weather in {weather.name}</h2>
            <div className="flex items-center justify-center mt-2">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="w-16 h-16"
              />
            </div>
            <p className="text-lg">Temperature: {weather.main.temp}°C</p>
            <p className="text-md">Weather: {weather.weather[0].description}</p>
            <p className="text-md">Humidity: {weather.main.humidity}%</p>
            <p className="text-md">Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
