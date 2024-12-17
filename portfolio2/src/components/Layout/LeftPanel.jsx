import React from "react";
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
  const handleSectionSelect = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="left-panel">
      <TransitionGroup>
        <CSSTransition
          key={selectedProject ? "project-index" : "main-nav"}
          timeout={300}
          classNames="fade"
        >
          <div className="page-transition">
            {selectedProject ? (
              <ProjectIndex
                project={selectedProject}
                onBack={() => {
                  setSelectedProject(null);
                  setActiveSection(null);
                }}
                onSectionSelect={handleSectionSelect}
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
