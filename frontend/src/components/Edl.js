import React, { useState, useEffect } from "react";
import axios from "axios";

const Edl = () => {
  const [edlData, setEdlData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/edl");
        setEdlData(response.data);
      } catch (error) {
        console.error("Error fetching EDL data:", error);
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
      <h1>EDL Data</h1>
      <pre>{JSON.stringify(edlData, null, 2)}</pre>
    </div>
  );
};

export default Edl;
