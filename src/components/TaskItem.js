import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  const handleToggle = (e) => {
    e.preventDefault();
    onToggleComplete(task);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className="group rounded-xl border bg-card p-4 space-y-4 transition-all hover:shadow-lg hover:border-primary/20 dark:hover:border-primary/40"
    >
      <motion.div 
        className="flex items-start justify-between"
        initial={false}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-start space-x-4">
          <motion.button
            onClick={handleToggle}
            className="mt-1 relative group/check"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            <motion.div
              initial={false}
              animate={task.completed ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="absolute inset-0"
            >
              <CheckCircle className="h-5 w-5 text-primary" />
            </motion.div>
            <motion.div
              initial={false}
              animate={task.completed ? { scale: 0 } : { scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <Circle className="h-5 w-5 text-muted-foreground group-hover/check:text-primary transition-colors" />
            </motion.div>
          </motion.button>
          <div className="flex-1 space-y-1">
            <motion.h3 
              layout="position"
              className={`font-semibold transition-all ${
                task.completed 
                  ? 'line-through text-muted-foreground' 
                  : 'text-foreground'
              }`}
            >
              {task.title}
            </motion.h3>
            <motion.p 
              layout="position"
              className={`text-sm transition-all ${
                task.completed 
                  ? 'line-through text-muted-foreground/70' 
                  : 'text-muted-foreground'
              }`}
            >
              {task.description}
            </motion.p>
          </div>
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              to={`/edit-task/${task.id}`}
              className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.button
            onClick={() => onDelete(task.id)}
            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskItem;
