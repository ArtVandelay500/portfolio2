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
  const renderContent = () => {
    if (selectedProject) {
      return (
        <ProjectDetail
          project={selectedProject}
          activeSection={activeSection}
        />
      );
    }

    switch (currentView) {
      case "home":
        return <Home />;
      case "projects":
        return <ProjectList setSelectedProject={setSelectedProject} />;
      case "contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="right-panel">
      <TransitionGroup>
        <CSSTransition
          key={selectedProject ? `project-${selectedProject.id}` : currentView}
          timeout={300}
          classNames="fade"
          mountOnEnter
          unmountOnExit
        >
          {/* Wrap rendered content in a div that will receive transition classes */}
          <div className="page-transition">{renderContent()}</div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default RightPanel;
