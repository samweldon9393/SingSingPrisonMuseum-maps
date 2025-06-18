import { useState, useEffect } from "react";
import { FiPlay, FiPause } from "react-icons/fi";

/* TODO can I move the svg file into public dir? */
import type { FunctionComponent, SVGProps } from "react";
import { ReactComponent as Map1886 } from '../src/images/1886.svg';
import { ReactComponent as Map1891 } from '../src/images/1891.svg';
import { ReactComponent as Map1897 } from '../src/images/1897.svg';
import { ReactComponent as Map1903 } from '../src/images/1903.svg';
import { ReactComponent as Map1911 } from '../src/images/1911.svg';
import { ReactComponent as Map1924 } from '../src/images/1924.svg';
import "./style.css";

type MapData = {
  src: string | FunctionComponent<SVGProps<SVGSVGElement>>;
  year: string;
};

const maps: MapData[] = [
    { src: Map1886, year: "1886" },
    { src: Map1891, year: "1891" },
    { src: Map1897, year: "1897" },
    { src: Map1903, year: "1903" },
    { src: Map1911, year: "1911" },
    { src: Map1924, year: "1924" }
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
              {maps.map((map, i) => {
                  const MapComponent = map.src;
                  return (
                      <div
                      key={i}
                      className={`slideshow-image ${i === index ? "visible" : ""}`}
                      >
                      <MapComponent />
                      </div>
                  );
              })}
          <div className="slideshow-container">
              <div className="caption-banner">
                  <h2><strong>{maps[index].year}</strong></h2>
              </div>
          </div>
      </div>
  );
}

export default App;

