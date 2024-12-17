import React from "react";

const NavList = ({ currentView, setCurrentView }) => {
  return (
    <ul className="nav-list">
      <li
        className={currentView === "home" ? "active" : ""}
        onClick={() => setCurrentView("home")}
      >
        Home
      </li>
      <li
        className={currentView === "projects" ? "active" : ""}
        onClick={() => setCurrentView("projects")}
      >
        Projects
      </li>
      <li
        className={currentView === "contact" ? "active" : ""}
        onClick={() => setCurrentView("contact")}
      >
        Contact
      </li>
    </ul>
  );
};

export default NavList;
