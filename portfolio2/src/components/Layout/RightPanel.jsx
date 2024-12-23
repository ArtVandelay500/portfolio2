import React, { useRef } from "react";
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
          timeout={600}
          classNames="fade"
          onExited2={() => console.log("Component exited")}
          onEntered2={() => console.log("Component entered")}
          onExit={(node) => {
            console.log("Starting exit", { selectedProject, currentView });
          }}
        >
          <div className="page-transition">
            {selectedProject ? (
              <ProjectDetail
                project={selectedProject}
                activeSection={activeSection}
              />
            ) : currentView === "projects" ? (
              <ProjectList setSelectedProject={setSelectedProject} />
            ) : currentView === "contact" ? (
              <Contact />
            ) : (
              <Home />
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default RightPanel;
