
import React, { useState, useEffect, useCallback } from 'react';
import './InstructionPopup.css';

interface InstructionPopupProps {
  timeoutDuration?: number; // in milliseconds
}

const InstructionPopup: React.FC<InstructionPopupProps> = ({ timeoutDuration = 12000 }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

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

  if (!showPopup) return null;

  return (
    <div className="instruction-popup-overlay">
      <div className="instruction-popup-content">
        <h2>How to Use This App</h2>
        <ul>
          <li>Press home button to select language.</li>
          <li>Swipe or use arrow buttons to move through the years.</li>
          <li>Use the play/pause button to start or stop the animation.</li>
          <li>Tap highlighted regions on the maps to learn more.</li>
          <li>If inactive for a while, this popup will appear again with instructions.</li>
        </ul>
        <button className="close-button" onClick={() => setShowPopup(false)}>Got It!</button>
      </div>
    </div>
  );
};

export default InstructionPopup;

