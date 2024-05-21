import React, { useState, useEffect } from "react";
import axios from "axios";

const Nasa = () => {
  const [nasaData, setNasaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/nasa");
        setNasaData(response.data);
      } catch (error) {
        console.error("Error fetching NASA data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>NASA Data</h1>
      {nasaData && (
        <div>
          <h2>{nasaData.title}</h2>
          <p>{nasaData.date}</p>
          <p>{nasaData.explanation}</p>
          {nasaData.media_type === "image" ? (
            <img src={nasaData.url} alt={nasaData.title} />
          ) : (
            <iframe
              title={nasaData.title}
              src={nasaData.url}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Nasa;
