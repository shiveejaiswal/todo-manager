import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group rounded-lg border p-4 space-y-4 transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <button
            onClick={() => onToggleComplete(task.id)}
            className="mt-1 text-muted-foreground hover:text-primary transition-colors"
          >
            {task.completed ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>
          <div>
            <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h3>
            <p className={`text-sm text-muted-foreground ${task.completed ? 'line-through' : ''}`}>
              {task.description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/edit-task/${task.id}`}
            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </Link>
          <button
            onClick={() => onDelete(task.id)}
            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
