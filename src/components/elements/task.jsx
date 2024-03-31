import React from "react";

const task = ({ task, handleCloseCard }) => {
  const duedate = new Date(task.duedate);
  const datecreated = new Date(task.dateofcreation);

  return (
    <div className="task-edit-container">
      <div className="taskbox" id="task-display">
        <div>
          <h2>{task.title}</h2>
          <p
            style={{
              margin: "0px",
              fontSize: "13px",
              position: "relative",
              bottom: "2vh",
            }}
          >
            {datecreated.getDate()}{" "}
            {datecreated.toLocaleString("default", { month: "short" })}{" "}
          </p>
        </div>
        <textarea
          className="task-description-display"
          value={task.description}
          readOnly={true}
          style={{ fontFamily: "Poppins, sans-serif" }}
        ></textarea>
        <div>
          <p>
            Due : {duedate.toLocaleString("default", { month: "short" })}{" "}
            {duedate.getDate()}
            {", "}
            {duedate.toLocaleString("default", { year: "numeric" })}
            {", "}
            {duedate.toLocaleString("default", {
              hour: "numeric",
              minute: "numeric",
            })}
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
        </div>
        <button onClick={handleCloseCard} className="taskboxbutton">
          Close
        </button>
      </div>
    </div>
  );
};

export default task;
