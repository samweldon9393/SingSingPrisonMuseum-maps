import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from "react-router-dom";
import { LanguageProvider } from './LanguageContext';


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
      <LanguageProvider>
        <HashRouter>
            <App />
        </HashRouter>
    </LanguageProvider>
  </React.StrictMode>
);

