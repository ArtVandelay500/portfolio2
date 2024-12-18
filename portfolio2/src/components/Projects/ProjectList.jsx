import React from "react";

const ProjectList = ({ setSelectedProject }) => {
  // Use the same project data structure as ProjectDetail
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform Redesign",
      overview: "",
      sections: {
        challenges: `The existing platform faced multiple challenges...`,
        features: [],
        technical_stack: `Frontend:
        • React.js for UI components
        • Redux for state management...`,
        implementation: `The implementation process followed a phased approach...`,
        results: `The project achieved significant improvements...`,
        lessons_learned: `Key takeaways from the project...`,
      },
    },
    // Add more projects as needed
  ];

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-card"
          onClick={() => {
            console.log("Project selected:", project); // Debug log
            setSelectedProject(project);
          }}
        >
          <h2>{project.title}</h2>
          <p>{project.overview}</p>
          <div className="project-categories">
            {Object.keys(project.sections).map((category, index) => (
              <span key={index} className="category">
                {category.replace("_", " ")}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
