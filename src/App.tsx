import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { NotFound404 } from "./pages/notfound/NotFound404";
import { SignUp } from "./pages/singup/SignUp";
import { PrivateRoute } from "./shared/components/PrivateRoute";
import "./App.css";
import { Profile } from "./pages/profile/Profile";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signin" exact component={SignUp} />
          <PrivateRoute path="/home" exact component={Home} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route component={NotFound404} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
