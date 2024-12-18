import React, { useState } from "react";
import LeftPanel from "./components/Layout/LeftPanel";
import RightPanel from "./components/Layout/RightPanel";
import WaveEffect from "./components/Background/WaveEffect";
import "./styles/reset.css";
import "./styles/layout.css";
import "./styles/panels.css";
import "./styles/transitions.css";
import "./styles/navigation.css";
import "./styles/theme.css";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("light-mode");

    const modeToAdd = isDarkMode ? "light" : "dark";
    const modeToRemove = isDarkMode ? "dark" : "light";

    const backgroundElement = document.querySelector(".background");
    const toggleTrackElement = document.querySelector(".toggle-track");
    const buttonElement = document.querySelector(".back-button");

    if (backgroundElement) {
      backgroundElement.classList.remove(modeToRemove);
      backgroundElement.classList.add(modeToAdd);
    }

    if (toggleTrackElement) {
      toggleTrackElement.classList.remove(modeToRemove);
      toggleTrackElement.classList.add(modeToAdd);
    }
    if (buttonElement) {
      buttonElement.classList.remove(modeToRemove);
      buttonElement.classList.add(modeToAdd);
    }
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark" : "light"}`}>
      <WaveEffect isDarkMode={isDarkMode} />
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        data-light-mode={!isDarkMode}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div className="toggle-track">
          <div className="toggle-thumb" />
        </div>
      </button>
      <div className="content-wrapper">
        <LeftPanel
          currentView={currentView}
          setCurrentView={setCurrentView}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          activeSection={activeSection} // Add this
          setActiveSection={setActiveSection} // Add this
        />
        <RightPanel
          currentView={currentView}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          activeSection={activeSection}
        />
      </div>
    </div>
  );
}

export default App;
