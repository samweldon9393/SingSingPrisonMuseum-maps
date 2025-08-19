// src/App.tsx
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import MainApp from "./MainApp";
import LandingPage from "./LandingPage";
import Sources from "./Sources";
import InstructionPopup from "./components/InstructionPopup";

function App() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage setShowInstructions={setShowInstructions} />} />
      <Route path="/map" element={<MainApp />} />
      <Route path="/sources" element={<Sources />} />
    </Routes>
    <InstructionPopup showInstructions={showInstructions} setShowInstructions={setShowInstructions}/>
    </>
  );
}

export default App;

