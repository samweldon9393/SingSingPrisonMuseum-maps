// src/LandingPage.tsx
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { CiSquareInfo } from "react-icons/ci";
import "./LandingPage.css";
import { useState } from "react";
import InstructionPopup from './components/InstructionPopup';

const LandingPage = () => {
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);

  const handleSelect = (lang: "en" | "es") => {
    setLanguage(lang);
    navigate("/map");
  };

  const handleInfo = () => {
    navigate("/sources");
  }

  return (
      <div className="landing-page">
          <div>
            {showPopup && <InstructionPopup  />}
          </div>
          <div className="landing-background"></div>
          <div className="landing-card">
            <div className="info-card">
              <div className="info-button">
                <button onClick={() => handleInfo()}>
                      {<CiSquareInfo size={28}/>}
                </button>
              </div>
              </div>
            <h1 className="title-heading">200 Years of Sing Sing</h1>
            <p className="subheading">
              Explore the rich history of one of America's most iconic prisons.
            </p>
            <img
              src={`${process.env.PUBLIC_URL}/images/Museum/OldCellBlock.png`}
              alt="Old Cell Block"
            />
            <div className="lang-section">
                <i>Select Language / Seleccione Idioma</i>
                <div className="lang-buttons">
                  <button onClick={() => handleSelect("en")}>English</button>
                  <button onClick={() => handleSelect("es")}>Español</button>
                </div>
            </div>
        </div>
    </div>

  );
};

export default LandingPage;

