
import React, { useState, useEffect, useCallback } from 'react';
import './InstructionPopup.css';

interface InstructionPopupProps {
  showInstructions?: boolean;
  setShowInstructions?: any;
}

const InstructionPopup: React.FC<InstructionPopupProps> = ({ showInstructions = false, setShowInstructions}) => {

  if (!showInstructions) {
      return null;
  }

  return (
    <div className="instruction-popup-overlay">
      <div className="instruction-popup-content">
        <div className="instruction-lists">
          <ul className="instruction-list">
            <h2><strong>How to Use This App</strong></h2>
            <li>Press home button to select language.</li>
            <li>Swipe or use arrow buttons to see change over time.</li>
            <li>Use the play/pause button to start or stop the animation.</li>
            <li>Tap highlighted regions on the maps to learn more.</li>
          </ul>
          <ul className="instruction-list">
            <h2>Cómo Usar Esta Aplicación</h2>
            <li>Presione el botón de inicio para elegir idioma.</li>
            <li>Deslice o use flechas para ver cambios con el tiempo.</li>
            <li>Use el botón de play/pausa para iniciar o parar.</li>
            <li>Toque zonas marcadas en el mapa para saber más.</li>
          </ul>
        </div>
        <button className="instruction-close-button" onClick={() => {setShowInstructions(false);}}>Got It!</button>
      </div>
    </div>
  );
};

export default InstructionPopup;

