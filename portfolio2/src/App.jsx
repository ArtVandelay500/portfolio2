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

    if (backgroundElement) {
      backgroundElement.classList.remove(modeToRemove);
      backgroundElement.classList.add(modeToAdd);
    }

    // Save the intended mode for when the button is rendered
    localStorage.setItem("buttonTheme", modeToAdd); // Store the intended state
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark" : "light"}`}>
      <div
        className="theme-toggle-overlay"
        onClick={toggleTheme} // Toggle theme when clicked
      ></div>
      <WaveEffect isDarkMode={isDarkMode} />
      <div className="content-wrapper">
        <LeftPanel
          currentView={currentView}
          setCurrentView={setCurrentView}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          activeSection={activeSection} // Add this
          setActiveSection={setActiveSection} // Add this
          isDarkMode={isDarkMode}
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
