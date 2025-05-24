import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./UserContext";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <Toaster />
      <App />
    </UserContextProvider>
  </React.StrictMode>
);

// Entry point for NEOGEN app
// - Wraps App component with React.StrictMode for highlighting potential issues
// - Provides global state via UserContextProvider
// - Integrates react-hot-toast for toast notifications
// - Renders App inside root DOM element

