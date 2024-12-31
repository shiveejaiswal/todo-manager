// src/components/TaskItem.js
import React from "react";
import { Link } from "react-router-dom";

const TaskItem = ({ task, onDelete }) => {
  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-actions">
        <Link to={`/edit-task/${task.id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
