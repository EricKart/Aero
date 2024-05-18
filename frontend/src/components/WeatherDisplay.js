import React from 'react';
import styled from 'styled-components';

const WeatherDisplay = ({ weatherData }) => {
  return (
    <Container>
      {weatherData.map((data, index) => (
        <WeatherItem key={index}>
          <p><strong>City:</strong> {data.city}</p>
          <p><strong>Temperature:</strong> {data.temperature}°C</p>
          <p><strong>Weather:</strong> {data.weather}</p>
          <p><strong>Timestamp:</strong> {new Date(data.timestamp).toLocaleString()}</p>
        </WeatherItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
`;

const WeatherItem = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default WeatherDisplay;
