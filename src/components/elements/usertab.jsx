import React from "react";
import plus from "../../images/plus.png";
import logout from "../../images/logout.png";
import settings from "../../images/setting.png";
const UserTab = ({ user }) => {
  return (
    <>
      <div className="user-tab">
        <div className="header">
          <div className="username">
            <span>Name</span>
          </div>
          <div className="task-status">
            <span>0/5 tasks</span>
          </div>
        </div>
        <div className="menu-2">
          <div className="menu-2-item">
            <span className="menu-2-icon">
              <img src={plus} alt="plus" />
            </span>
            <span>Add a team</span>
          </div>
          <div
            className="menu-2-item"
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.reload();
            }}
          >
            <span className="menu-2-icon">
              <img src={logout} alt="plus" />
            </span>
            <span>Log out</span>
          </div>
          <div className="menu-2-item">
            <span className="menu-2-icon">
              <img src={settings} alt="plus" />
            </span>
            <span>Settings</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTab;
