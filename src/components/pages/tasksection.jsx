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
import UserTab from "../elements/usertab";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Task = () => {
  const query = useQuery();
  const { tasks, setTasks } = useContext(MyContext);
  const { isfetching, setIsfetching } = useContext(MyContext);
  const [userTab, setUserTab] = useState(false); // updated this line
  const [displayTasks, setDisplayTasks] = useState([]);
  const [introText, setIntroText] = useState(true);
  const handleClick = () => {
    setUserTab(!userTab);
  };
  useEffect(() => {
    console.log(query.get("category"));
    if (query.get("category")) {
      setIntroText(false);
    } else if (!query.get("category")) {
      setIntroText(true);
    }
  }, [query.get("category")]);

  useEffect(() => {
    const datafetch = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/tasks");
        const data = await response.json();
        setTasks(data);
        filterdata();
        setIsfetching(false);
      } catch (err) {
        console.log(err);
      }
    };
    datafetch();
  }, [query.get("category"), isfetching]);

  const filterdata = () => {
    setDisplayTasks(
      filteredTasks(
        tasks.filter((task) => !task.completed),
        "Today"
      )
    );
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
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        {introText ? (
          <Homepage />
        ) : displayTasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          displayTasks.map((taskdata, index) => (
            <TaskCard key={index} task={taskdata} />
          ))
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
          cursor: "pointer",
        }}
        alt="user"
        onClick={handleClick}
      />
      {userTab && <UserTab />}
      <BottomBar />
    </>
  );
};

export default Task;
