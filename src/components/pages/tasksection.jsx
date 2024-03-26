import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../elements/sidebar";
import TaskCard from "../elements/taskCard";
import BottomBar from "../elements/bottombar";
import user from "../../images/user.png";
import Homepage from "../elements/homepage";
import { MyContext } from "../../App";
import filteredTasks from "../elements/datefilter";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Task = () => {
  const query = useQuery();
  const { tasks } = useContext(MyContext);
  const [displayTasks, setDisplayTasks] = useState([]);
  const [introText, setIntroText] = useState(true);

  useEffect(() => {
    console.log(query.get("category"));
    if (query.get("category")) {
      setIntroText(false);
    } else if (!query.get("category")) {
      setIntroText(true);
    }
  }, [query]);

  useEffect(() => {
    if (query.get("category") === "all") {
      setDisplayTasks(tasks);
    } else if (query.get("category") === "Today") {
      setDisplayTasks(
        filteredTasks(
          tasks.filter((task) => !task.completed),
          "Today"
        )
      );
    } else if (query.get("category") === "Tomorrow") {
      setDisplayTasks(
        filteredTasks(
          tasks.filter((task) => !task.completed),
          "Tomorrow"
        )
      );
    } else if (query.get("category") === "Upcoming") {
      setDisplayTasks(
        filteredTasks(
          tasks.filter((task) => !task.completed),
          "Upcoming"
        )
      );
    } else if (query.get("category") === "Completed") {
      setDisplayTasks(filteredTasks(tasks, "Completed"));
    }
  }, [query.get("category"), tasks]);

  return (
    <>
      <Sidebar />
      <div className="content">
        {introText ? (
          <Homepage />
        ) : displayTasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          displayTasks.map((taskdata) => <TaskCard task={taskdata} />)
        )}
      </div>
      <div style={{ padding: "100px" }}></div>
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
