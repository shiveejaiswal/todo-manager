import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Home, Moon, Sun, CheckSquare } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = ({ searchQuery, onSearchChange, isDarkMode, onToggleDarkMode }) => {
  const location = useLocation();

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
        >
          <CheckSquare className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Todo-Manager
          </h1>
        </motion.div>
        
        <div className="flex items-center gap-4 ml-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
          </motion.div>
          
          <motion.button
            onClick={onToggleDarkMode}
            className="inline-flex items-center justify-center rounded-md w-10 h-10 bg-accent/50 text-accent-foreground hover:bg-accent hover:text-accent-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>

          <nav className="flex items-center gap-4">
            {[
              { to: "/", icon: Home, label: "Home" },
              { to: "/add-task", icon: PlusCircle, label: "Add Task" }
            ].map((item) => (
              <motion.div
                key={item.to}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                    ${location.pathname === item.to 
                      ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90' 
                      : 'bg-accent/50 text-accent-foreground hover:bg-accent hover:text-accent-foreground'
                    } h-10 px-4 py-2`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
