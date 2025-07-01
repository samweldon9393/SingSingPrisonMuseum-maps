// src/App.tsx
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import MainApp from "./MainApp";

function App() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/map" element={<MainApp />} />
    </Routes>
  );
}

export default App;

