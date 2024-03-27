import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskSection from "./components/pages/tasksection";
import Task from "./components/elements/task";
export const MyContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      completed: false,
      description: "This is task 1",
      dateofcreation: new Date(),
      dueDate: new Date(),
    },
    {
      id: 2,
      title: "Task 2",
      completed: false,
      description: "This is task 2",
      dateofcreation: new Date(),
      dueDate: new Date(),
    },
  ]);

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
