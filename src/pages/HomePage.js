import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, removeTask, updateTask } from "../features/tasks/taskSlice";
import TaskItem from "../components/TaskItem";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ListTodo } from 'lucide-react';
import { toast } from 'react-hot-toast';

const HomePage = ({ searchQuery }) => {
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
      toast.success('Task deleted successfully', {
        icon: '🗑️',
        duration: 2000,
      });
    } catch (err) {
      console.error('Failed to delete task:', err);
      toast.error('Failed to delete task');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = {
        ...task,
        completed: !task.completed
      };
      await dispatch(updateTask(updatedTask)).unwrap();
      toast.success(updatedTask.completed ? '✅ Task completed!' : '↩️ Task reopened', {
        duration: 2000,
      });
    } catch (err) {
      console.error('Failed to update task:', err);
      toast.error('Failed to update task status');
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-8 w-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-[400px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-destructive">Error: {error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="container py-8 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
            Your Tasks
          </h2>
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary">
            <ListTodo className="h-4 w-4" />
          </div>
        </motion.div>
        <motion.div 
          className="text-sm text-muted-foreground px-3 py-1 rounded-md bg-muted"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {filteredTasks.length} task{filteredTasks.length !== 1 && 's'}
        </motion.div>
      </div>
      
      {filteredTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
        >
          <div className="rounded-full bg-muted p-4">
            <ListTodo className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg">
            {searchQuery ? 'No tasks found matching your search.' : 'No tasks available.'}
          </p>
          {!searchQuery && (
            <p className="text-sm text-muted-foreground">Add a new task to get started!</p>
          )}
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div 
            className="grid gap-4"
            layout
          >
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default HomePage;
