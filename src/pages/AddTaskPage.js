import React from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "../components/TaskForm";
import { toast } from "react-hot-toast";

const AddTaskPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (title, description) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      completed: false,
    };

    try {
      await dispatch(createTask(newTask)).unwrap();
      toast.success('Task created successfully!');
      navigate("/");
    } catch (err) {
      toast.error('Failed to create task');
      console.error('Failed to create task:', err);
    }
  };

  return (
    <div className="container max-w-2xl py-8 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Add New Task</h2>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddTaskPage;
