// src/LandingPage.tsx
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import "./LandingPage.css";

const LandingPage = () => {
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSelect = (lang: "en" | "es") => {
    setLanguage(lang);
    navigate("/map");
  };

  return (
      <div className="landing-page">
          <div className="landing-background"></div>
          <div className="landing-card">
            <h1>200 Years of Sing Sing</h1>
            <p className="subheading">
              Explore the rich history of one of America's most iconic prisons.
            </p>
            <img
              src={`${process.env.PUBLIC_URL}/images/Museum/OldCellBlock.png`}
              alt="Old Cell Block"
            />
            <i>Select Language / Seleccione Idioma</i>
            <div className="lang-buttons">
              <button onClick={() => handleSelect("en")}>English</button>
              <button onClick={() => handleSelect("es")}>Español</button>
            </div>
        </div>
    </div>

  );
};

export default LandingPage;

