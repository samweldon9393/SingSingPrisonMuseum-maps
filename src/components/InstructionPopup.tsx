
import React, { useState, useEffect, useCallback } from 'react';
import './InstructionPopup.css';

interface InstructionPopupProps {
  timeoutDuration?: number; // in milliseconds
}

const InstructionPopup: React.FC<InstructionPopupProps> = ({ timeoutDuration = 120000 }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [shownOnce, setShownOnce] = useState(false);

  // Reset activity timer
  const handleUserActivity = useCallback(() => {
    setLastActivity(Date.now());
    if (showPopup) setShowPopup(false); // Hide popup if showing
  }, [showPopup]);

  useEffect(() => {
    const activityEvents = ['click', 'touchstart'];

    activityEvents.forEach((event) =>
      document.addEventListener(event, handleUserActivity)
    );

    const interval = setInterval(() => {
      if (Date.now() - lastActivity > timeoutDuration) {
        setShowPopup(true);
      }
    }, 1000);

    return () => {
      activityEvents.forEach((event) =>
        document.removeEventListener(event, handleUserActivity)
      );
      clearInterval(interval);
    };
  }, [lastActivity, handleUserActivity, timeoutDuration]);

  if (!showPopup)
  {
      return null;
  }
  if (timeoutDuration === 0 && shownOnce){
      setShowPopup(false);
  }

  return (
    <div className="instruction-popup-overlay">
      <div className="instruction-popup-content">
        <h2>How to Use This App | Cómo Usar Esta Aplicación</h2>
        <div className="instruction-lists">
          <ul className="instruction-list">
            <li>Press home button to select language.</li>
            <li>Swipe or use arrow buttons to move through the years.</li>
            <li>Use the play/pause button to start or stop the animation.</li>
            <li>Tap highlighted regions on the maps to learn more.</li>
          </ul>
          <ul className="instruction-list">
            <li>Presione el botón de inicio para seleccionar el idioma.</li>
            <li>Deslice o use las flechas para avanzar por los años.</li>
            <li>Use el botón de reproducir/pausar para iniciar o detener la animación.</li>
            <li>Toque las regiones resaltadas en los mapas para obtener más información.</li>
          </ul>
        </div>
        <button className="instruction-close-button" onClick={() => {setShowPopup(false); setShownOnce(true);}}>Got It!</button>
      </div>
    </div>
  );
};

export default InstructionPopup;

