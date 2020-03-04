import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import World from './features/world'
import Login from "./Pages/Login";
import AuthLayout from "./layout/AuthLayout";
import Register from "./Pages/Register";

function App() {
  return (
    <Switch>
      <AuthLayout path="/login" component={Login} page="login" />
      <AuthLayout path="/register" component={Register} page="register" />
      <Route exact path="/world" component={World} page="world" />
    </Switch>
  );
}

export default App;

