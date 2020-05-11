import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from ".";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default AdminRoute;
