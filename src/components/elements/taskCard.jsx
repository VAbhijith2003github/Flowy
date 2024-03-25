import React, { useState } from "react";
import "../../styles.css";
import calender from "../../images/calendar.png";
import { Link } from "react-router-dom";
import editIcon from "../../images/editing.png";
import deleteIcon from "../../images/delete.png";

const TaskCard = ({ task }) => {
  const [isComplete, setIsComplete] = useState(task.completed);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const targetDate = new Date(task.targetdate);
  const today = new Date();

  const getStatusLabel = () => {
    if (targetDate.toDateString() === today.toDateString()) {
      return <span className="status-label status-orange"></span>;
    }
    if (new Date(task.targetdate) < today) {
      return <span className="status-label status-red"></span>;
    }
    return <span className="status-label status-green"></span>;
  };

  const handleToggleComplete = () => {
    setIsComplete(!isComplete);
  };

  return (
    <div
      className="task-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="task-details">
        <div className="task-title">
          <h3>{task.title}</h3>
        </div>
        <p>
          <span className="label">{getStatusLabel()}</span>
          <img src={calender} className="calender" alt="calender" />
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(task.dateofcreation)}
        </p>
        <button className="complete-button" onClick={handleToggleComplete}>
          {isComplete ? "Mark as incomplete" : "Mark as complete"}
        </button>
      </div>
      <div className="task-actions">
        {isHovered && (
          <>
            <Link to={`/tasks/edit/${task.id}`}>
              <img src={editIcon} alt="Edit" className="task-icon" />
            </Link>
            <img src={deleteIcon} alt="Delete" className="task-icon" />
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
