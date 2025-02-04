import { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherApp.css";

const cities = ["Seoul", "Busan", "Daegu", "Gwangju", "Incheon"];

const WeatherApp = () => {
  const [city, setCity] = useState("서울");
  const [weather, setWeather] = useState<{ temp: number; description: string }>({
    temp: 0,
    description: "",
  });

    const [a1, seta1] = useState<{ lat: number; lon: number }>({
      lat: 123,
      lon: 123,
    });

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
  const BASE_URL_1 = "http://api.openweathermap.org/geo/1.0/direct";

  useEffect(() => {
    fetchWeather_1(city);
    fetchWeather(city);
  }, [city]);
  
  useEffect(() => {
    console.log("🌡️ 상태 업데이트됨:", weather);  // 상태 업데이트 로그 추가
  }, [weather]);
  
  const fetchWeather_1 = async (cityName: string) => {
    try {
      const response = await axios.get(BASE_URL_1, {
        params: {
          q: city,
          appid: API_KEY,
        },
      });
      console.log("✅ API 응답 데이터:", response.data);  // API 응답 확인용 로그
      seta1({
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      });
      console.log("a1:", response.data[0].lat, response.data[0].lon);  // API 응답 확인용 로그
    } catch (error) {
      console.error("❌ 날씨 정보를 가져오는 중 오류 발생:", error);
    }
  };

  const fetchWeather = async (cityName: string) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          lat: a1.lat,
          lon: a1.lon,
          appid: API_KEY,
          units: "metric",
          lang: "kr",
        },
      });
      console.log("✅ API 응답 데이터:", response.data);  // API 응답 확인용 로그
      setWeather({
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
      });
    } catch (error) {
      console.error("❌ 날씨 정보를 가져오는 중 오류 발생:", error);
    }
  };
  
  return (
    <div className="weather-container">
      <h1>🌤️ 한국 날씨</h1>
      <div className="button-group">
        {cities.map((c) => (
          <button key={c} onClick={() => setCity(c)} className={city === c ? "active" : ""}>
            {c}
          </button>
        ))}
      </div>
      <div className="weather-info">
        <h2>{city}의 날씨</h2>
        <p>온도: {weather.temp}°C</p>
        <p>설명: {weather.description}</p>
      </div>
    </div>
  );
};

export default WeatherApp;
