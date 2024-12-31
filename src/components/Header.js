import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1>To-Do List Manager</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add-task">Add Task</Link>
      </nav>
    </header>
  );
};

export default Header;
