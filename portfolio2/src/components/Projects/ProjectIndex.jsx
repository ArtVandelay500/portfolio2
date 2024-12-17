import React from "react";

const ProjectIndex = ({ project, onBack, onSectionSelect, activeSection }) => {
  if (!project || !project.sections) {
    return null;
  }

  return (
    <div className="project-index">
      <button className="back-button" onClick={onBack}>
        Back to Projects
      </button>
      <h2>{project.title}</h2>
      <ul className="section-list">
        {Object.keys(project.sections).map((section) => (
          <li
            key={section}
            className={`section-item ${
              activeSection === section ? "active" : ""
            }`}
            onClick={() => onSectionSelect(section)}
          >
            {section.replace("_", " ").charAt(0).toUpperCase() +
              section.slice(1).replace("_", " ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectIndex;
