import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Home from "../Home";
import Contact from "../Contact";
import ProjectList from "../Projects/ProjectList";
import ProjectDetail from "../Projects/ProjectDetail";

const RightPanel = ({
  currentView,
  selectedProject,
  setSelectedProject,
  activeSection,
}) => {
  return (
    <div className="right-panel">
      <TransitionGroup>
        <CSSTransition
          key={selectedProject ? `project-${selectedProject.id}` : currentView}
          timeout={1200}
          classNames="fade"
        >
          <div className="page-transition">
            {selectedProject ? (
              <ProjectDetail
                project={selectedProject}
                activeSection={activeSection}
              />
            ) : (
              <div className="content-container">
                {currentView === "projects" ? (
                  <ProjectList setSelectedProject={setSelectedProject} />
                ) : currentView === "contact" ? (
                  <Contact />
                ) : (
                  <Home />
                )}
              </div>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default RightPanel;
