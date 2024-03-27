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
  const { tasks, setTasks } = useContext(MyContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openCard, setOpenCard] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  function UpdateTasks(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const handleMarkasComplete = (id) => {
    UpdateTasks(id);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    document.getElementsByClassName("bottom-bar")[0].style.display = "none";
  };

  const dueDate = new Date(task.dueDate);
  const today = new Date();

  const getStatusLabel = () => {
    if (dueDate.getDate() === today.getDate()) {
      return <span className="status-label status-orange"></span>;
    }
    if (new Date(task.dueDate) < today) {
      return <span className="status-label status-red"></span>;
    }
    return <span className="status-label status-green"></span>;
  };

  const onSave = (id, title, description, dueDate) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title,
            description,
            dueDate: dueDate.toISOString(),
          }
        : task
    );
    setTasks(updatedTasks);
    setIsEditing(false);
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

    element.style.overflowY = openCard ? "hidden" : "scroll";

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
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(task.dateofcreation)}
        </p>
        <button
          className="complete-button"
          onClick={() => handleMarkasComplete(task.id)}
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
              onClick={() => handleDelete(task.id)}
            />
          </>
        )}
      </div>
      <>
        <div>
          {isEditing && (
            <TaskEdit task={task} onSave={onSave} handleClose={handleClose} />
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
