import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../features/tasks/taskSlice';
import { useParams } from 'react-router-dom';

const EditTaskPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleUpdate = (status) => {
    dispatch(updateTask({ id, status }));
  };

  return (
    <div>
      <h2>Edit Task Status</h2>
      <button onClick={() => handleUpdate(true)}>Mark as Completed</button>
      <button onClick={() => handleUpdate(false)}>Mark as Pending</button>
    </div>
  );
};

export default EditTaskPage;
