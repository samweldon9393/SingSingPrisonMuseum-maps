// src/components/Popup.tsx
import React from 'react';
import './popup.css';
import captions from '../captions.json';
const captionMap = captions as { [key: string]: string };

type Props = {
  regionId: string;
  onClose: () => void;
};

const Popup: React.FC<Props> = ({ regionId, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="popup-close" onClick={onClose}>×</button>
        <h3><strong>{regionId}</strong></h3>
        <p>{captionMap[regionId] || "No info available."}</p>
      </div>
    </div>
  );
};

export default Popup;

