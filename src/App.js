import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Settings from "./pages/Settings";
import EditStudent from "./components/EditStudent";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  render() {
    return (
      <div className="page-container">
        <Navbar />

        <Switch>
          <AnonRoute exact path="/" component={Home} />

          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/main" component={Main} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/settings/editstudent" component={EditStudent} />
        </Switch>
      </div>
    );
  }
}



export default App;
