import React from "react";
import WeatherApp from "./components/WeatherApp";  // 상대 경로: ./components/WeatherApp.tsx


const App: React.FC = () => {
  return (
    <div>
      <WeatherApp />
    </div>
  );
};

export default App;
