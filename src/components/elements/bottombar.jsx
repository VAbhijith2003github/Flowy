import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MyContext } from "../../App";

const BottomBar = () => {
  const { tasks, setTasks } = useContext(MyContext);
  const [isActive, setIsActive] = useState(false);
  const [task, setTask] = useState({
    id: 0,
    title: "",
    completed: false,
    description: "",
    dateofcreation: new Date(),
    dueDate: new Date(),
    dateCompleted: null,
  });

  function TaskAddition(task) {
    setTasks([...tasks, task]);
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
              onChange={(e) =>
                setTask({
                  ...task,
                  title: e.target.value,
                })
              }
            />
            <textarea
              name="description"
              value={task.description}
              placeholder="Task description"
              onChange={(e) =>
                setTask({
                  ...task,
                  description: e.target.value,
                })
              }
            />
            <div>
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
            <div>
              <button onClick={handleAddTask}>ADD TASK</button>
              <button
                onClick={() => {
                  setIsActive(false);
                  setTask({
                    name: "",
                    description: "",
                    dueDate: new Date(),
                  });
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BottomBar;
