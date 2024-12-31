import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <motion.div 
      className="relative w-full max-w-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <motion.input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background/60 pl-10 pr-4 text-sm ring-offset-background backdrop-blur placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default SearchBar;
