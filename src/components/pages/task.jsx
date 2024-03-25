import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../elements/sidebar";
import TaskCard from "../elements/taskCard";
import BottomBar from "../elements/bottombar";
import user from "../../images/user.png";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Task = () => {
  const query = useQuery();

  const [introText, setIntroText] = useState(true);

  useEffect(() => {
    if (query.get("category")) {
      setIntroText(false);
    }
  }, [query]);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (query.get("category") === "Today") {
      setTasks([
        {
          id: 1,
          title: "Task 1",
          completed: false,
          dateofcreation: new Date(),
          targetdate: new Date(),
        },
        {
          id: 2,
          title: "Task 2",
          completed: false,
          dateofcreation: new Date(),
          targetdate: new Date(),
        },
      ]);
    } else if (query.get("category") === "Completed") {
      setTasks([
        {
          id: 3,
          title: "Task 3",
          completed: true,
          dateofcreation: new Date(),
          targetdate: new Date(),
        },
        {
          id: 4,
          title: "Task 4",
          completed: true,
          dateofcreation: new Date(),
          targetdate: new Date(),
        },
      ]);
    } else if (query.get("category") === "Upcoming") {
      setTasks([
        {
          id: 5,
          title: "Task 5",
          completed: false,
          dateofcreation: new Date(),
          targetdate: new Date(),
        },
        {
          id: 6,
          title: "Task 6",
          completed: false,
          dateofcreation: new Date(),
          targetdate: new Date(),
        },
      ]);
    } else if (query.get("category") === "Tommorow") {
      setTasks([
        {
          id: 5,
          title: "Task 7",
          completed: false,
          dateofcreation: new Date(),
          targetdate: new Date(),
        },
        {
          id: 6,
          title: "Task 8",
          completed: false,
          dateofcreation: new Date(),
          targetdate: new Date(),
        },
      ]);
    } else if (!query.get("category")) {
      setIntroText(true);
      setTasks([]);
    }
  }, [query]);

  return (
    <>
      <Sidebar />
      <div className="content">
        {introText && (
          <div className="intro-text">
            <h1 className="gradient-text">Welcome to Flowy!</h1>
            <p>
              Flowy allows you to manage your tasks and keep track of your
              progress.
            </p>
            <p>
              To get started, select a category from the sidebar on the left.
            </p>
            <p>Your Ultimate productivity partner is here !</p>
          </div>
        )}
        {tasks.map((taskdata) => (
          <TaskCard task={taskdata} />
        ))}
      </div>
      <img
        src={user}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          height: "35px",
          width: "35px",
        }}
        alt="user"
      />
      <BottomBar />
    </>
  );
};

export default Task;
