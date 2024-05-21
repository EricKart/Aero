import React, { useState, useEffect } from "react";
import axios from "axios";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/flights");
        setFlights(response.data);
      } catch (error) {
        setError("Error fetching flights");
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Flight Data</h1>
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            <strong>Airline:</strong> {flight.airline} <br />
            <strong>Flight Number:</strong> {flight.flightNumber} <br />
            <strong>Departure:</strong> {flight.departure} <br />
            <strong>Arrival:</strong> {flight.arrival} <br />
            <strong>Status:</strong> {flight.status} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
