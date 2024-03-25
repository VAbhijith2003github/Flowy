import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Task from "./components/pages/task";
export const MyContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState({
    today: [
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
    ],
    tomorrow: [
      {
        id: 3,
        title: "Task 3",
        completed: false,
        description: "This is task 3",
        dateofcreation: new Date(),
        dueDate: new Date(),
      },
      {
        id: 4,
        title: "Task 4",
        completed: false,
        description: "This is task 4",
        dateofcreation: new Date(),
        dueDate: new Date(),
      },
    ],
    upcoming: [
      {
        id: 5,
        title: "Task 5",
        completed: false,
        description: "This is task 5",
        dateofcreation: new Date(),
        dueDate: new Date(),
      },
      {
        id: 6,
        title: "Task 6",
        completed: false,
        description: "This is task 6",
        dateofcreation: new Date(),
        dueDate: new Date(),
      },
    ],
    completed: [
      {
        id: 7,
        title: "Task 7",
        completed: true,
        description: "This is task 7",
        dateofcreation: new Date(),
        dueDate: new Date(),
      },
      {
        id: 8,
        title: "Task 8",
        completed: true,
        description: "This is task 8",
        dateofcreation: new Date(),
        dueDate: new Date(),
      },
    ],
    all: [],
  });

  return (
    <div>
      <MyContext.Provider value={{ tasks, setTasks }}>
        <Router>
          <Routes>
            <Route path="/" element={<Task />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </div>
  );
};

export default App;
