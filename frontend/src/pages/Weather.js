import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WeatherDisplay from "../components/WeatherDisplay";

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    fetch("/api/weather")
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
  }, []);

  return (
    <Container>
      <Title>Weather Data</Title>
      <WeatherDisplay weatherData={weatherData} />
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export default Weather;
