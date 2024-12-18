import React from "react";
const NavList = ({ currentView, setCurrentView }) => {
  const navItems = ["home", "projects", "contact"];

  return (
    <>
      <h1>hey</h1>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li
            key={item}
            className={currentView === item ? "active" : ""}
            onClick={() => setCurrentView(item)}
            data-text={item} // Add this attribute
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavList;
