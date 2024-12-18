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
}) => {
  const handleBack = () => {
    // First set a temporary fake project to ensure the transition key changes
    setSelectedProject({ ...selectedProject, id: "transition-" + Date.now() });

    // Then after a brief timeout, set it to null
    setTimeout(() => {
      setSelectedProject(null);
      setActiveSection(null);
    }, 10); // Very short timeout to ensure React catches both changes
    console.log(`${selectedProject.id}`);
    console.log(`Selected LeftPanel proejct is : ${selectedProject.id}`);
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
