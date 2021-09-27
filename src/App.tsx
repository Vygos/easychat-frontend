import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { NotFound404 } from "./pages/notfound/NotFound404";
import SignUp from "./pages/singup/SignUp";
import { PrivateRoute } from "./shared/components/PrivateRoute";

const App = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <BrowserRouter forceRefresh>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signin" exact component={SignUp} />
          <PrivateRoute path="/home" exact component={Home} />
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
