import React from "react";

const ProjectList = ({ setSelectedProject }) => {
  const projects = [
    {
      id: 1,
      title: "Project One",
      description: "Brief description of project one",
      categories: ["React", "Node.js"],
      sections: {
        title: "Detailed project information",
        features: ["Feature 1", "Feature 2", "Feature 3"],
        database: "MongoDB with Mongoose",
        details: "Full project implementation details...",
      },
    },
    // ... other projects
  ];

  const handleProjectClick = (project) => {
    console.log("Project clicked:", project); // Debug log
    setSelectedProject(project);
  };

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-card"
          onClick={() => handleProjectClick(project)}
        >
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <div className="project-categories">
            {project.categories.map((category, index) => (
              <span key={index} className="category">
                {category}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
