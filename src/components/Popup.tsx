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
  const imageUrl = `${process.env.PUBLIC_URL}${captionMap[regionId]}`;
  return (
      <div className="popup">
          <button className="close-button" onClick={onClose}>×</button>
          <h3>{regionId}</h3>
          {imageUrl ? (
              <img src={imageUrl} alt={regionId} className="popup-image" />
          ) : (
          <p>No image available.</p>
          )}
      </div>
  );
};

export default Popup;

