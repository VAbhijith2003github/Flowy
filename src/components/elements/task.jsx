import React from "react";

const task = ({ task, handleCloseCard }) => {
  return (
    <div className="task-edit-container">
      <div className="taskbox" id="task-display">
        <h2>{task.title}</h2>
        <textarea
          className="task-description-display"
          value={task.description}
          readOnly={true}
          style={{ fontFamily: "Poppins, sans-serif" }}
        ></textarea>
        <p>
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(task.duedate)}
          ,&nbsp;&nbsp;
          {new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
          }).format(task.duedate)}
        </p>
        {task.completed ? (
          <p style={{ color: "rgba(117, 233, 152)" }}>
            Completed :{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(task.dateCompleted)}
            ,&nbsp;&nbsp;
            {new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "numeric",
            }).format(task.dateCompleted)}
          </p>
        ) : (
          <></>
        )}
        <button onClick={handleCloseCard} className="taskboxbutton">
          Close
        </button>
      </div>
    </div>
  );
};

export default task;
