import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Task from "./components/pages/task";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Task />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
