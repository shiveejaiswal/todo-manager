import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Home } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl font-bold tracking-tight"
        >
          TaskMaster
        </motion.h1>
        <nav className="ml-auto flex gap-4">
          <Link
            to="/"
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none 
              ${location.pathname === '/' 
                ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90' 
                : 'hover:bg-accent hover:text-accent-foreground'
              } h-10 px-4 py-2`}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
          <Link
            to="/add-task"
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none 
              ${location.pathname === '/add-task' 
                ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90' 
                : 'hover:bg-accent hover:text-accent-foreground'
              } h-10 px-4 py-2`}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
