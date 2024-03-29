import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskSection from "./components/pages/tasksection";
import Task from "./components/elements/task";
export const MyContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      <MyContext.Provider value={{ tasks, setTasks }}>
        <Router>
          <Routes>
            <Route path="/" element={<TaskSection />} />
            <Route path="/task" element={<Task />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </div>
  );
};

export default App;
