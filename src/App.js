import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AddTaskPage from './pages/AddTaskPage';
import EditTaskPage from './pages/EditTaskPage';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Header 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        <main>
          <Routes>
            <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/add-task" element={<AddTaskPage />} />
            <Route path="/edit-task/:id" element={<EditTaskPage />} />
          </Routes>
        </main>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white',
          }}
        />
      </div>
    </Router>
  );
};

export default App;

