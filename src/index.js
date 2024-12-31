// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Use this for React 18
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./App.css";

// Create the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app using createRoot
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
