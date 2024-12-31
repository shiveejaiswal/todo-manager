import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, removeTask, updateTask } from "../features/tasks/taskSlice";
import TaskItem from "../components/TaskItem";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from 'lucide-react';

const HomePage = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(removeTask(id)).unwrap();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      try {
        await dispatch(updateTask({
          ...task,
          completed: !task.completed
        })).unwrap();
      } catch (err) {
        console.error('Failed to update task:', err);
      }
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Your Tasks</h2>
        <div className="text-sm text-muted-foreground">
          {tasks.length} task{tasks.length !== 1 && 's'}
        </div>
      </div>
      
      {tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
        >
          <p className="text-muted-foreground text-lg">No tasks available.</p>
          <p className="text-sm text-muted-foreground">Add a new task to get started!</p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="grid gap-4">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default HomePage;