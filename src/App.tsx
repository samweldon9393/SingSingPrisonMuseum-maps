// src/App.tsx
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import MainApp from "./MainApp";
import LandingPage from "./LandingPage";
import Sources from "./Sources";
import InstructionPopup from "./components/InstructionPopup";

function App() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage setShowPopup={setShowPopup} />} />
      <Route path="/map" element={<MainApp />} />
      <Route path="/sources" element={<Sources />} />
    </Routes>
    <InstructionPopup showPopup={showPopup} setShowPopup={setShowPopup}/>
    </>
  );
}

export default App;

