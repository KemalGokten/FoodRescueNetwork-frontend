import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";

import "./styles/global.css";
import theme from "./styles/theme.js";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position="top-right" zIndex={1000}/>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
