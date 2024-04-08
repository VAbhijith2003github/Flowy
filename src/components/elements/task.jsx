import React, { useState, useEffect } from "react";

const Task = ({ task, handleCloseCard }) => {
  const duedate = new Date(task.duedate);
  const datecreated = new Date(task.dateofcreation);
  const [assigned_by, setAssigned_by] = useState("");
  const [assigned_to, setAssigned_to] = useState("");
  useEffect(() => {
    const getAssignedBy = async () => {
      const authtoken = localStorage.getItem("auth-token");
      const response = await fetch(
        `https://flowy-backend.onrender.com/api/users/getuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
          body: JSON.stringify({ id: task.assigned_by }),
        }
      );
      const data = await response.json();
      setAssigned_by(data);
    };
    getAssignedBy();
    if (task.assigned_to) {
      const getAssignedTo = async () => {
        const authtoken = localStorage.getItem("auth-token");
        const response = await fetch(
          `https://flowy-backend.onrender.com/api/users/getuser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authtoken}`,
            },
            body: JSON.stringify({ id: task.assigned_to }),
          }
        );
        const data = await response.json();
        setAssigned_to(data);
      };
      getAssignedTo();
    }
  }, []);

  return (
    <div className="task-edit-container">
      <div className="taskbox" id="task-display">
        <div>
          <h2>{task.title}</h2>
          <div style={{ display: "flex" }}>
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
            {task.assigned_by && (
              <p
                style={{
                  margin: "0px",
                  fontSize: "13px",
                  position: "relative",
                  bottom: "2vh",
                }}
              >
                &nbsp;&nbsp;Assigned by {assigned_by}
              </p>
            )}
          </div>
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
          {task.assigned_to && (
            <p
              style={{
                margin: "0px",
                fontSize: "13px",
                position: "relative",
                bottom: "2vh",
              }}
            >
              &nbsp;&nbsp;Assigned to {assigned_to}
            </p>
          )}
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

export default Task;
