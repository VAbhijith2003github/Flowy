import React from "react";
import plus from "../../images/plus.png";
import logout from "../../images/logout.png";
import about from "../../images/info.png";
const UserTab = ({ user }) => {
  return (
    <>
      <div className="user-tab">
        <div className="header">
          <div className="username">
            <span>USER</span>
          </div>
        </div>
        <div className="menu-2">
          <div className="menu-2-item">
            <span className="menu-2-icon">
              <img src={plus} alt="plus" />
            </span>
            <span>invite a friend</span>
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
            <a
              href="https://github.com/VAbhijith2003github/Flowy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <span className="menu-2-icon">
                <img src={about} alt="plus" />
              </span>
              <span>About</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTab;
