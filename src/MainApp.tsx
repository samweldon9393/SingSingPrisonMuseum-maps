import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// Languages
import { useLanguage } from "./LanguageContext";
import captionsEn from "./captions.en.json";
import captionsEs from "./captions.es.json";

// Play button
import { FiPlay, FiPause, FiHome } from "react-icons/fi";
import { useSwipeable } from 'react-swipeable';

// Maps
import Map1886 from "./components/Map1886";
import { ReactComponent as Map1891 } from '../src/images/1891.svg';
import Map1897 from "./components/Map1897";
import { ReactComponent as Map1903 } from '../src/images/1903.svg';
import { ReactComponent as Map1911 } from '../src/images/1911.svg';
import Map1924 from "./components/Map1924";
import { ReactComponent as Map2025 } from '../src/images/2025.svg';
import Popup from './components/Popup';
import "./style.css";

// map react components : year
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
    { Component: Map1924, year: "1924" },
    { Component: Map2025, year: "2025" }
];

function MainApp() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [activeRegion, setActiveRegion] = useState<string | null>(null);
    const navigate = useNavigate();

    // Languages
    const { language } = useLanguage();
    const captionMap = language === "en" ? captionsEn : captionsEs;

    useEffect(() => {
        if (paused) return; // Skip interval if paused
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % maps.length);
        }, 2000); // Change slide every 2 seconds
        return () => clearInterval(interval);
    }, [paused]);
    // Auto-clear popup when map changes
    useEffect(() => {
        setActiveRegion(null);
    }, [index]);

    const handleRegionClick = (regionId: string) => {
        if (regionId !== "image1"){ // image1 means click on non-region
            // Pause when region is clicked
            setPaused(true);
            setActiveRegion(regionId);
        } else {
            setActiveRegion(null);
        }
    };




  // Swipe functionality
  const swipeHandlers = useSwipeable({
      onSwipedLeft: () => {
          setIndex((prev) => (prev + 1) % maps.length);
          setPaused(true); // pause autoplay on manual swipe
      },
      onSwipedRight: () => {
          setIndex((prev) => (prev - 1 + maps.length) % maps.length);
          setPaused(true);
      },
      trackMouse: true // allows swipe with mouse drag too
  });


  return (
      <div className="slideshow-wrapper">
          <div className="controls">
              <button onClick={() => setPaused(false)} className="icon-button">
                  {<FiPlay size={28} />}
              </button>
              <button onClick={() => setPaused(true)} className="icon-button">
                  {<FiPause size={28} />}
              </button>

              <button onClick={() => {
                  setActiveRegion(null); setPaused(true); setIndex(0); navigate('/'); 
              }} className="icon-button">
                  <FiHome size={28} />
              </button>
          </div>
          <div className="slideshow-container" {...swipeHandlers}>
              {maps.map((map, i) => {
                  const MapComponent = map.Component;
                  const isActive = i === index;
                  return (
                      <div
                          key={i}
                          className={`slideshow-image ${isActive ? "visible" : ""}`}
                      >
                      {map.year === "1924" || map.year === "1886"  || map.year === "1897" ? (
                          <MapComponent onRegionClick={handleRegionClick} />
                      ) : (
                      <MapComponent />
                      )}
                      </div>
                  );
              })}
              <div className="caption-banner">
                  <h2><strong>{maps[index].year}</strong></h2>
                  <div className="banner-swipe">
                    <div><i>Swipe for Next / Prev Year</i></div>
                    <div><i>Tap Yellow Sections For Information</i></div>
                  </div>
              </div>
          </div>
          {activeRegion && (
              <Popup regionId={activeRegion} onClose={() => setActiveRegion(null)} captionMap={captionMap} />
          )}
      </div>
  );
}

export default MainApp;

