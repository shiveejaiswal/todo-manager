import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../features/tasks/taskSlice";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { toast } from "react-hot-toast";
import { Loader2 } from 'lucide-react';

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { tasks, status } = useSelector((state) => state.tasks);
  const task = tasks.find((t) => t.id === id);

  const handleSubmit = async (title, description) => {
    if (!task) return;

    try {
      await dispatch(updateTask({
        ...task,
        title,
        description,
      })).unwrap();
      toast.success('Task updated successfully!');
      navigate("/");
    } catch (err) {
      toast.error('Failed to update task');
      console.error('Failed to update task:', err);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container py-8">
        <p className="text-destructive">Task not found</p>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Edit Task</h2>
      <TaskForm
        initialTitle={task.title}
        initialDescription={task.description}
        onSubmit={handleSubmit}
        isEditing
      />
    </div>
  );
};

export default EditTaskPage;
