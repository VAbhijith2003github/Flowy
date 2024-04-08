import React, { useEffect, useState } from "react";
import "../../styles.css";
import calender from "../../images/calendar.png";
import editIcon from "../../images/editing.png";
import deleteIcon from "../../images/delete.png";
import { useContext } from "react";
import { MyContext } from "../../App";
import TaskEdit from "./taskEdit";
import Task from "./task";

const TaskCard = ({ task }) => {
  const { isfetching, setIsfetching } = useContext(MyContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openCard, setOpenCard] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMarkasComplete = (string_id) => {
    console.log(string_id);
    const updatecompletestatdb = async () => {
      try {
        const authtoken = localStorage.getItem("auth-token");
        const response = await fetch(
          `https://flowy-backend.onrender.com/api/tasks/updatecompletestatdb/${string_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authtoken}`,
            },
            body: JSON.stringify({
              completed: !task.completed,
              dateCompleted: new Date(),
            }),
          }
        );
      } catch (err) {
        console.error("Error updating task:", err);
      }
    };
    updatecompletestatdb();
    setIsfetching(true);
  };

  const handleDelete = (string_id) => {
    const deletefromdb = async () => {
      try {
        const authtoken = localStorage.getItem("auth-token");
        const response = await fetch(
          `https://flowy-backend.onrender.com/api/tasks/${string_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authtoken}`,
            },
          }
        );
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    };
    deletefromdb();
    setIsfetching(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    document.getElementsByClassName("bottom-bar")[0].style.display = "none";
  };

  const onsave = () => {
    setIsfetching(true);
    setIsEditing(false);
    document.getElementsByClassName("bottom-bar")[0].style.display = "block";
  };
  const duedate = new Date(task.duedate);
  const today = new Date();

  const getStatusLabel = () => {
    if (duedate.getDate() === today.getDate()) {
      return <span className="status-label status-orange"></span>;
    }
    if (new Date(task.duedate) < today) {
      return <span className="status-label status-red"></span>;
    }
    return <span className="status-label status-green"></span>;
  };

  const handleClick = () => {
    setOpenCard(true);
    console.log("clicked");
    document.getElementsByClassName("bottom-bar")[0].style.display = "none";
  };

  useEffect(() => {
    const element = document.body;
    if (!element) {
      return;
    }

    element.style.overflowY = openCard ? "hidden" : "scroll"; // disable scrolling when the card is open

    return () => {
      element.style.overflowY = "scroll";
    };
  }, [openCard]);

  const handleClose = () => {
    setIsEditing(false);
    document.getElementsByClassName("bottom-bar")[0].style.display = "block";
  };

  const handleCloseCard = () => {
    setOpenCard(false);
    console.log("clicked");
    document.getElementsByClassName("bottom-bar")[0].style.display = "block";
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
          {duedate.getDate()}{" "}
          {duedate.toLocaleString("default", { month: "short" })}
        </p>
        <button
          className="complete-button"
          onClick={() => handleMarkasComplete(task.string_id)}
        >
          {task.completed ? "Mark as incomplete" : "Mark as complete"}
        </button>
        {isHovered && (
          <button
            className="complete-button"
            onClick={handleClick}
            style={{ marginLeft: "10px" }}
          >
            View Task
          </button>
        )}
      </div>
      <div className="task-actions">
        {isHovered && (
          <>
            <img
              src={editIcon}
              alt="Edit"
              className="task-icon"
              onClick={handleEdit}
            />
            <img
              src={deleteIcon}
              alt="Delete"
              className="task-icon"
              onClick={() => handleDelete(task.string_id)}
            />
          </>
        )}
      </div>
      <>
        <div>
          {isEditing && (
            <TaskEdit task={task} onSave={onsave} handleClose={handleClose} />
          )}
        </div>
        <div>
          {openCard && <Task task={task} handleCloseCard={handleCloseCard} />}
        </div>
      </>
    </div>
  );
};

export default TaskCard;
