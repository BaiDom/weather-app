import "./App.css";
import React from "react";
import { useEffect, useState } from "react";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (lat !== null && long !== null) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
          );
          const result = await response.json();
          setData(result);
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      lat is:{lat} long is: {long}
    </div>
  );
}

export default App;
