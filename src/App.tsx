import { useState, useEffect } from "react";
import { FiPlay, FiPause } from "react-icons/fi";
import "./style.css";

type MapData = {
  src: string;
  year: string;
};

const maps: MapData[] = [
    { src: "./images/1886.jpg", year: "1886" },
    { src: "./images/1891.jpg", year: "1891" },
    { src: "./images/1897.jpg", year: "1897" },
    { src: "./images/1903.jpg", year: "1903" },
    { src: "./images/1911.jpg", year: "1911" },
    { src: "./images/1924.jpg", year: "1924" }
];

function App() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return; // Skip interval if paused
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % maps.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [paused]);

  return (
      <div className="slideshow-wrapper">
          <div className="controls">
              <button onClick={() => setPaused(!paused)} className="icon-button">
                  {paused ? <FiPlay size={28} /> : <FiPause size={28} />}
              </button>
          </div>
          <div className="slideshow-container">
              {maps.map((map, i) => (
                  <img
                      key={i}
                      src={map.src}
                      alt={`Map from ${map.year}`}
                      className={`slideshow-image ${i === index ? 'visible' : ''}`}
                  />
              ))}
              <div className="caption-banner">
                  <h2><strong>{maps[index].year}</strong></h2>
              </div>
          </div>
      </div>
  );
}

export default App;

