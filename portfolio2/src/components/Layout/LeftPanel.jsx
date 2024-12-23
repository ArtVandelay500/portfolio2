import React, { useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import NavList from "../Navigation/NavList";
import ProjectIndex from "../Projects/ProjectIndex";

const LeftPanel = ({
  currentView,
  setCurrentView,
  selectedProject,
  setSelectedProject,
  activeSection,
  setActiveSection,
  isDarkMode,
}) => {
  const handleBack = () => {
    // First set a temporary fake project to ensure the transition key changes
    setSelectedProject({ ...selectedProject, id: "transition-" + Date.now() });

    console.log("Back clicked, before state changes");
    setSelectedProject(null);
    setActiveSection(null);
    console.log("Back clicked, after state changes");
  };
  return (
    <div className="left-panel">
      <TransitionGroup>
        <CSSTransition
          key={selectedProject ? "project-index" : "main-nav"}
          timeout={600}
          classNames="fade"
        >
          <div className="page-transition">
            {selectedProject ? (
              <ProjectIndex
                project={selectedProject}
                onBack={handleBack}
                onSectionSelect={(section) => setActiveSection(section)}
                activeSection={activeSection}
                isDarkMode={isDarkMode}
              />
            ) : (
              <NavList
                currentView={currentView}
                setCurrentView={setCurrentView}
              />
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default LeftPanel;
