// src/App.tsx
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import MainApp from "./MainApp";
import LandingPage from "./LandingPage";
import Sources from "./Sources";

function App() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/map" element={<MainApp />} />
      <Route path="/sources" element={<Sources />} />
    </Routes>
  );
}

export default App;

