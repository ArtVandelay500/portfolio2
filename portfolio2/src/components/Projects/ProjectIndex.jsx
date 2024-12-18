import React from "react";

const ProjectIndex = ({ project, onBack, onSectionSelect, activeSection }) => {
  if (!project || !project.sections) {
    return null;
  }

  // Use the same section names and order as ProjectDetail
  const sections = Object.keys(project.sections);

  return (
    <div className="project-index">
      <button
        className="back-button"
        onClick={onBack} // This will trigger the handleBack function from LeftPanel
      >
        Back to Projects
      </button>
      <h2>{project.title}</h2>
      <ul className="section-list">
        {sections.map((section) => (
          <li
            key={section}
            className={`section-item ${
              activeSection === section ? "active" : ""
            }`}
            onClick={() => {
              console.log("Section clicked:", section); // Debug log
              onSectionSelect(section);
            }}
          >
            {section.replace("_", " ").toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectIndex;
