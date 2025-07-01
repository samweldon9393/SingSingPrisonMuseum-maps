// src/components/Popup.tsx
import React from 'react';
import './popup.css';
import captions_en from '../captions.en.json';
import captions_es from '../captions.es.json';
const captionMap = captions_en as { [key: string]: string[] };

type Props = {
  regionId: string;
  onClose: () => void;
};

const Popup: React.FC<Props> = ({ regionId, onClose }) => {
  const caption = captionMap[regionId];
  const imageUrl = caption ? `${process.env.PUBLIC_URL}${captionMap[regionId][0]}` : null;

  return (
      <div className="popup">
          <button className="close-button" onClick={onClose}>×</button>
          <h3>{regionId}</h3>
          {imageUrl ? (
              <>
              <img src={imageUrl} alt={regionId} className="popup-image" />
              <i>{captionMap[regionId][1]}</i>
              </>
          ) : (
          <p>No image available.</p>
          )}
      </div>
  );
};

export default Popup;

