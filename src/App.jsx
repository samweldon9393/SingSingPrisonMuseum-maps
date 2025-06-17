import { useState, useEffect } from "react";
import "./style.css";

const images = [
  "./images/1886.jpg",
  "./images/1891.jpg",
  "./images/1897.jpg",
  "./images/1903.jpg",
  "./images/1911.jpg",
  "./images/1924.jpg",
];

function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      <img src={images[index]} alt={`Map ${index + 1}`} className="map-image" />
    </div>
  );
}

export default App;

