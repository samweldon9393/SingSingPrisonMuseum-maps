// src/components/Popup.tsx
import React from 'react';
import './popup.css';

type Props = {
  regionId: string;
  onClose: () => void;
};

const Popup: React.FC<Props> = ({ regionId, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <button className="popup-close" onClick={onClose}>×</button>
        <h3>{regionId}</h3>
        <p>This is some info about <strong>{regionId}</strong>. You can customize this text.</p>
      </div>
    </div>
  );
};

export default Popup;

