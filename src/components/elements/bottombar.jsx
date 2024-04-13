import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import { MyContext } from "../../App";
import { useContext } from "react";

const BottomBar = () => {
  const { isfetching, setIsfetching } = useContext(MyContext);
  const [userexists, setUserexists] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [task, setTask] = useState({
    string_id: "",
    title: "",
    completed: false,
    description: "",
    dateofcreation: new Date(),
    dueDate: new Date(),
    dateCompleted: null,
    assigned_to: null,
  });

  const handleemailchange = (e) => {
    setTask({
      ...task,
      assigned_to: e.target.value,
    });
    const checkforuser = async () => {
      const authtoken = localStorage.getItem("auth-token");
      const response = await fetch(
        "https://flowy-backend.onrender.com/api/users/checkuserexits",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
          body: JSON.stringify({ email: e.target.value }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok && data.message === "User found") {
        setUserexists(true);
      } else {
        setUserexists(false);
      }
    };
    setTimeout(checkforuser, 300);
  };

  function TaskAddition(task) {
    const AddTask = async () => {
      try {
        const id = uuidv4();
        task.string_id = id;
        const authtoken = localStorage.getItem("auth-token");
        const response = await fetch(
          "https://flowy-backend.onrender.com/api/tasks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authtoken}`,
            },
            body: JSON.stringify(task),
          }
        );

        if (response.status === 200) {
          setTask({
            string_id: "",
            title: "",
            completed: false,
            description: "",
            dateofcreation: new Date(),
            dueDate: new Date(),
            dateCompleted: null,
            assigned_to: null,
          });
        }

        const data = await response.json();
        console.log(data);
        setIsfetching(true);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    };

    AddTask();
  }

  const minDate = new Date();

  const handleAddTask = () => {
    console.log(task);
    TaskAddition(task);
    setIsActive(false);
  };
  const handleTaskDueDateChange = (date) => {
    setTask({
      ...task,
      dueDate: date,
    });
  };

  const handleCancel = () => {
    setIsActive(false);
    setTask({
      string_id: "",
      title: "",
      completed: false,
      description: "",
      dateofcreation: new Date(),
      dueDate: new Date(),
      dateCompleted: null,
      assigned_to: null,
    });
  };

  return (
    <div className="bottom-bar">
      {!isActive && (
        <>
          <div style={{ display: "flex" }}>
            <button className="add-button" onClick={() => setIsActive(true)}>
              +
            </button>
            <h3 onClick={() => setIsActive(true)} style={{ cursor: "pointer" }}>
              Add Task{" "}
            </h3>
          </div>
        </>
      )}

      {isActive && (
        <>
          <div className="task-form">
            <h2 style={{ marginLeft: "10px" }}>Add Task</h2>
            <input
              type="text"
              name="name"
              value={task.title}
              placeholder="Task name"
              className="tasknameinput"
              onChange={(e) =>
                setTask({
                  ...task,
                  title: e.target.value,
                })
              }
            />
            <br />
            <textarea
              name="description"
              value={task.description}
              placeholder="Task description"
              className="taskDescriptioninput"
              onChange={(e) =>
                setTask({
                  ...task,
                  description: e.target.value,
                })
              }
            />
            <div>
              <div className="dateselectiondiv">
                <label
                  htmlFor="date"
                  style={{ fontSize: "15px", marginLeft: "10px" }}
                >
                  select date
                </label>
                <DatePicker
                  selected={task.dueDate}
                  onChange={handleTaskDueDateChange}
                  dateFormat="Pp"
                  minDate={minDate}
                  name="date"
                />
                <label
                  htmlFor="time"
                  style={{ fontSize: "15px", marginLeft: "10px" }}
                >
                  select time
                </label>
                <DatePicker
                  selected={task.dueDate}
                  onChange={handleTaskDueDateChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  name="time"
                />
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                }}
              >
                <input
                  type="email"
                  className="emailinput"
                  placeholder="assignee email"
                  onChange={handleemailchange}
                />
                {task.assigned_to && (
                  <>
                    {userexists ? (
                      <p style={{ color: "#16a085" }} className="userexists">
                        user exists
                      </p>
                    ) : (
                      <p style={{ color: "red" }} className="userexists">
                        user not found
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            <div>
              <button onClick={handleAddTask}>ADD TASK</button>
              <button onClick={handleCancel}>CANCEL</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BottomBar;
