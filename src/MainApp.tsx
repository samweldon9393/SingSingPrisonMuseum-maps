import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

// Languages
import { useLanguage } from "./LanguageContext";
import captionsEn from "./captions.en.json";
import captionsEs from "./captions.es.json";

// Instructions
import InstructionPopup from './components/InstructionPopup';

// Play button
import { FiPlay, FiPause, FiHome, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { BsQuestionCircleFill } from "react-icons/bs";

// Maps
import Map1834 from "./components/Map1834";
import Map1870 from "./components/Map1870";
import Map1886 from "./components/Map1886";
import Map1891 from "./components/Map1891";
import Map1897 from "./components/Map1897";
import Map1903 from "./components/Map1903";
import Map1911 from "./components/Map1911";
import Map1924 from "./components/Map1924";
import Map1931 from "./components/Map1931";
import Map2013 from "./components/Map2013";
import Popup from './components/Popup';
import "./style.css";

// map react components : year
type MapData = {
  Component: React.FC<any>;
  year: string;
};

const maps: MapData[] = [
    { Component: Map1834, year: "1834" },
    { Component: Map1870, year: "1870" },
    { Component: Map1886, year: "1886" },
    { Component: Map1891, year: "1891" },
    { Component: Map1897, year: "1897" },
    { Component: Map1903, year: "1903" },
    { Component: Map1911, year: "1911" },
    { Component: Map1924, year: "1924" },
    { Component: Map1931, year: "1931" },
    { Component: Map2013, year: "2013" },
];

interface MainAppProps {
  setShowInstructions?: any;
}

const MainApp: React.FC<MainAppProps> = ({ setShowInstructions }) => {
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

  const handleInfo = () => {
    setShowInstructions(true);
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
      <div>
        {<InstructionPopup  />}
      </div>
          <div className="map-background"></div>
          <div className="controls">
              <button onClick={() => {
                  setPaused(true); setIndex((prev) => (prev - 1) < 0 ? (maps.length - 1) : (prev - 1)); 
              }} className="icon-button">
                  {<FiArrowLeft size={28} />}
              </button>

              <button onClick={() => setPaused(prev => !prev)} className="icon-button">
                  {paused ? <FiPlay size={28} /> : <FiPause size={28} />}
              </button>

              <button onClick={() => {
                  handleInfo(); 
              }} className="icon-button">
                  <BsQuestionCircleFill size={28} />
              </button>

              <button onClick={() => {
                  setActiveRegion(null); setPaused(true); setIndex(0); navigate('/'); 
              }} className="icon-button">
                  <FiHome size={28} />
              </button>

              <button onClick={() => {
                  setPaused(true); setIndex((prev) => (prev + 1) % maps.length); 
              }} className="icon-button">
                  {<FiArrowRight size={28} />}
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
                      <MapComponent onRegionClick={handleRegionClick} />
                      </div>
                  );
              })}
              <div className="caption-banner">
                  <h2 className="banner-year"><strong>{maps[index].year}</strong></h2>
                  <div className="banner-swipe">
                    {language === "en" ? (
                        <>
                            <div className="banner-ins"><i>Swipe to Change Year.&nbsp;&nbsp;</i></div>
                            <div className="banner-ins"><i>Pinch to Zoom.&nbsp;&nbsp;</i></div>
                            <div className="banner-ins"><i>Tap Orange Sections For Information.</i></div>
                        </>
                    ) : (
                        <>
                            <div className="banner-ins"><i>Desliza para el año anterior o siguiente.&nbsp;&nbsp;</i></div>
                            <div className="banner-ins"><i>Pellizcar para hacer zoom.&nbsp;&nbsp;</i></div>
                            <div className="banner-ins"><i>Toca las secciones naranjas para información.</i></div>
                        </>
                    )}
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

