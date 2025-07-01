// src/LandingPage.tsx
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";

const LandingPage = () => {
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSelect = (lang: "en" | "es") => {
    setLanguage(lang);
    navigate("/map");
  };

  return (
    <div className="landing-page">
      <h1>Select Language / Seleccione Idioma</h1>
      <button onClick={() => handleSelect("en")}>English</button>
      <button onClick={() => handleSelect("es")}>Español</button>
    </div>
  );
};

export default LandingPage;

