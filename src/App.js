import React from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import Login from "./Pages/Login";
import AuthLayout from "./layout/AuthLayout";
import Register from "./Pages/Register";

function App() {
  return (
    <Switch>
      <AuthLayout path="/login" component={Login} page="login" />
      <AuthLayout path="/register" component={Register} page="register" />
    </Switch>
  );
}

export default App;
