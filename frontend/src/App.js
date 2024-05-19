import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/flights')
            .then(response => {
                setFlights(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching flights:', error);
            });
    }, []);

    return (
        <div>
            <h1>Flight Assessment App</h1>
            <ul>
                {flights.map(flight => (
                    <li key={flight.flight_date}>
                        {flight.flight_date} - {flight.flight_iata}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
