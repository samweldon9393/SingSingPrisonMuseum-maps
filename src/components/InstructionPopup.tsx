
import React, { useState, useEffect, useCallback } from 'react';
import './InstructionPopup.css';

interface InstructionPopupProps {
  timeoutDuration?: number; // in milliseconds
}

const InstructionPopup: React.FC<InstructionPopupProps> = ({ timeoutDuration = 60000 }) => {
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
      <div className="instruction-popup">
        <h2>How to Use This App</h2>
        <p>
          Welcome! This app is designed to help you explore data through animations and interactive features. Tap or click to interact with the elements on the screen. 
        </p>
        <p>
          If you ever get stuck, just touch the screen to resume or refresh the page.
        </p>
        <button onClick={() => setShowPopup(false)}>Got It!</button>
      </div>
    </div>
  );
};

export default InstructionPopup;

