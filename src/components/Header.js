// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Task Manager</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add-task">Add Task</Link>
      </nav>
    </header>
  );
};

export default Header;
