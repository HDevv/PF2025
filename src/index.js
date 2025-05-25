import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// mode theme
import { ThemeProvider } from "./context/ThemeContext";
// contextes utilisateurs / projets
import { UserProvider } from "./context/UserContext";
import { ProjectsProvider } from "./context/ProjectsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ProjectsProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ProjectsProvider>
    </UserProvider>
  </React.StrictMode>
);
