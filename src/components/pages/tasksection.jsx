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
import Modal from "../elements/loginmodal";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Task = () => {
  const query = useQuery();
  const { tasks, setTasks } = useContext(MyContext);
  const { isfetching, setIsfetching } = useContext(MyContext);
  const { loggedIn, setLoggedIn } = useContext(MyContext);
  const [userTab, setUserTab] = useState(false);
  const [displayTasks, setDisplayTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [introText, setIntroText] = useState(true);

  const handleClick = () => {
    if (loggedIn) {
      setUserTab(!userTab);
    } else {
      setIsModalOpen(!isModalOpen);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
        const authtoken = localStorage.getItem("auth-token");
        const response = await fetch("http://localhost:3001/api/tasks", {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        });
        const data = await response.json();
        setTasks(data);
        filterdata();
        setIsfetching(false);
      } catch (err) {
        console.log(err);
      }
    };
    datafetch();
  }, [query.get("category"), isfetching, loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const verifyToken = async () => {
        try {
          const token = localStorage.getItem("auth-token");
          const response = await fetch(
            "http://localhost:3001/api/users/verifyToken",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          if (data.success) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
        } catch (err) {
          console.log(err);
        }
      };

      verifyToken();
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      document.getElementsByClassName("bottom-bar")[0].style.display = "block";
    } else {
      document.getElementsByClassName("bottom-bar")[0].style.display = "none";
    }
  }, [loggedIn]);

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
    } else if (query.get("category") === "Past_due") {
      setDisplayTasks(filteredTasks(tasks, "Past_due"));
    }
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        {introText ? (
          <Homepage />
        ) : loggedIn && displayTasks.length === 0 ? (
          <p>No tasks</p>
        ) : loggedIn ? (
          displayTasks.map((taskdata, index) => (
            <TaskCard key={index} task={taskdata} />
          ))
        ) : (
          <>
            <h4>login to continue</h4>
          </>
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
      <Modal isModalOpen={isModalOpen} handleModalClose={handleModalClose} />
    </>
  );
};

export default Task;
