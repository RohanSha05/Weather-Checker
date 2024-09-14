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
		<>
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage:
						"url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
				}}
			>
				<div className="hero-overlay bg-opacity-60 text-black"></div>
				<div className="hero-content text-neutral-content text-center">
					<div className="max-w-md">
						<div className="flex flex-col items-center p-40 bg-blue-100 ">
							<h1 className="text-3xl text-black font-bold mb-4 ">
								Weather Checker
							</h1>
							<input
								className="border rounded p-2 mb-2 w-full max-w-xs text-black"
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
								<div className="mt-4 bg-gray-300 text-black shadow-md p-20 rounded text-center">
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
					</div>
				</div>
			</div>
		</>
	);
};

export default WeatherChecker;
