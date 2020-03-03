import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./lib/Auth"; //having it here is cleaner
import App from "./App";

//you could wrap it in multiple providers, 
//but the one closest to App will take precedence
ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
