import React, { useState } from "react";
import "../../styles.css";
import sidebarimg from "../../images/right-sidebar.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(true);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={`sidebar ${isActive ? "active" : ""}`}>
        <Link to="/">
          <h1 className="menu-item" id="Title">
            Flowy
          </h1>
        </Link>
        <Link to="/?category=Today" className="menu-item">
          {" "}
          Today
        </Link>
        <Link to="/?category=Tomorrow" className="menu-item">
          {" "}
          Tomorrow
        </Link>
        <Link to="/?category=Upcoming" className="menu-item">
          {" "}
          Upcoming
        </Link>
        <Link to="/?category=Completed" className="menu-item">
          {" "}
          Completed
        </Link>
      </div>

      <div className="content">
        <img
          src={sidebarimg}
          alt="sidebartoggle"
          className="sidebaricon"
          onClick={toggleSidebar}
        />
        <div className="page"></div>
      </div>
    </>
  );
};

export default Sidebar;
