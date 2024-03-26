import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import closebutton from "../../images/cross.png";

const TaskEdit = ({ task, onSave, handleClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(new Date(task.dueDate));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task.id, title, description, dueDate);
  };
  const handleTaskDueDateChange = (date) => {
    setDueDate(date);
  };

  const minDate = new Date();

  return (
    <div className="task-edit-container">
      <form onSubmit={handleSubmit} className="editform">
        <div style={{width:"100%",height:"25px"}}>
          <img
            src={closebutton}
            alt="close"
            style={{
              background: "transparent",
              width: "25px",
              height: "25px",
              cursor: "pointer",
              float: "right",
            }}
            onClick={handleClose}
          />
        </div>
        <input
          type="text"
          name="name"
          value={title}
          placeholder="Task name"
          onChange={(e) => setTitle(e.target.value)}
          style={{ backgroundColor: "rgba(30, 30, 30)", color: "white" }}
        />

        <textarea
          name="description"
          value={description}
          placeholder="Task description"
          onChange={(e) => setDescription(e.target.value)}
          style={{
            height: "clamp(40px,30vh,200px)",
            resize: "vertical",
            backgroundColor: "rgba(30, 30, 30)",
            color: "white",
          }}
        />
        <div>
          <label
            htmlFor="date"
            style={{
              fontSize: "15px",
              marginLeft: "10px",
              marginRight: "20px",
            }}
          >
            select date
          </label>
          <DatePicker
            selected={dueDate}
            onChange={handleTaskDueDateChange}
            dateFormat="Pp"
            minDate={minDate}
            name="date"
          />
          <label
            htmlFor="time"
            style={{
              fontSize: "15px",
              marginLeft: "15px",
              marginRight: "20px",
            }}
          >
            select time
          </label>
          <DatePicker
            selected={dueDate}
            onChange={handleTaskDueDateChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            name="time"
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TaskEdit;
