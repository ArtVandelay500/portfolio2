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
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("light-mode");
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark" : "light"}`}>
      <WaveEffect isDarkMode={isDarkMode} />
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>
      <div className="content-wrapper">
        <LeftPanel
          currentView={currentView}
          setCurrentView={setCurrentView}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <RightPanel
          currentView={currentView}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </div>
    </div>
  );
}

export default App;
