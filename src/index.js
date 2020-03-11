import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWRouter } from "./lib/Auth"; //having it here is cleaner
import App from "./App";

//you could wrap it in multiple providers, 
//but the one closest to App will take precedence
ReactDOM.render(
  <Router>
    <AuthProviderWRouter>
      <App />
    </AuthProviderWRouter>
  </Router>,
  document.getElementById("root")
);
