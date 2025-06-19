import { useState, useEffect } from "react";
import { FiPlay, FiPause } from "react-icons/fi";

import type { FunctionComponent, SVGProps } from "react";
import { ReactComponent as Map1886 } from '../src/images/1886.svg';
import { ReactComponent as Map1891 } from '../src/images/1891.svg';
import { ReactComponent as Map1897 } from '../src/images/1897.svg';
import { ReactComponent as Map1903 } from '../src/images/1903.svg';
import { ReactComponent as Map1911 } from '../src/images/1911.svg';
import Map1924 from "./components/Map1924";
import "./style.css";

import Popup from './components/Popup';

type MapData = {
  Component: React.FC<any>;
  year: string;
};

const maps: MapData[] = [
    { Component: Map1886, year: "1886" },
    { Component: Map1891, year: "1891" },
    { Component: Map1897, year: "1897" },
    { Component: Map1903, year: "1903" },
    { Component: Map1911, year: "1911" },
    { Component: Map1924, year: "1924" }
];

function App() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  useEffect(() => {
    if (paused) return; // Skip interval if paused
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % maps.length);
    }, 2000); // Change slide every 2 seconds
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
              {maps.map((map, i) => {
                  const MapComponent = map.Component;
                  const isActive = i === index;
                  return (
                      <div
                          key={i}
                          className={`slideshow-image ${isActive ? "visible" : ""}`}
                      >
                      {map.year === "1924" ? (
                          <MapComponent onRegionClick={setActiveRegion} />
                      ) : (
                      <MapComponent />
                      )}
                      </div>
                  );
              })}
              <div className="caption-banner">
                  <h2><strong>{maps[index].year}</strong></h2>
              </div>
          </div>
          {activeRegion && (
              <Popup regionId={activeRegion} onClose={() => setActiveRegion(null)} />
          )}
      </div>
  );
}

export default App;

