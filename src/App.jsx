import { useState } from "react";
import axios from "axios";

const WeatherChecker = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "cfb8f73012835c0cba087ba698ccb09b";

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("City not found. Please enter a valid city.");
      setWeather(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-5 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4  mt-20">Weather Checker</h1>
      <input
        className="border rounded p-2 mb-2 w-full max-w-xs"
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleInputChange}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={getWeather}
      >
        Check Weather
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weather && (
        <div className="mt-4 bg-gray-300 shadow-md p-20 rounded text-center">
          <h2 className="text-xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="capitalize">{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherChecker;
