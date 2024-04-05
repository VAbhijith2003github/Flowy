import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskSection from "./components/pages/tasksection";
import Task from "./components/elements/task";
export const MyContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isfetching, setIsfetching] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <MyContext.Provider
        value={{
          tasks,
          setTasks,
          isfetching,
          setIsfetching,
          loggedIn,
          setLoggedIn,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<TaskSection />} />
            <Route path="/task" element={<Task />} />
            <Route path="/task" element={<Task />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </div>
  );
};

export default App;
