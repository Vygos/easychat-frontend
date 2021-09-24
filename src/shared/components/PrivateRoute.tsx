import { rest } from "lodash";
import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { OauthService } from "../../service/oauth.service";

export const PrivateRoute = ({
  component: Component,
  ...rest
}) => {

  const oauthService = new OauthService();

  return (
    <Route
      {...rest}
      render={(props) =>
        oauthService.isTokenExpired ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
