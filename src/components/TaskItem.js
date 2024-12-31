import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h2>{task.title}</h2>
      <p>{task.completed ? 'Completed' : 'Pending'}</p>
      <Link to={`/edit-task/${task.id}`}>Edit</Link>
    </div>
  );
};

export default TaskItem;
