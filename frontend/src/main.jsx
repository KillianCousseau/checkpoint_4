import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { SidebarContextProvider } from "./contexts/SidebarContext";
import { UserContextProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SidebarContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </SidebarContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
