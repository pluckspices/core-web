import React from "react";
import { Route, Navigate } from "react-router-dom";

const GuardedRoute = ({ path, exact, element }) => {
  let condition;
  const token = localStorage.getItem("token");
  const expiryDate = localStorage.getItem("expiaryDate");
  if (!token || !expiryDate) {
    condition = false;
  }
  if (new Date(expiryDate) <= new Date()) {
    condition = false;
  } else {
    condition = true;
  }

  return condition ? (
    <Route path={path} exact={exact} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};
// <Route
//   {...rest}
//   render={(props) =>
//     auth ? <Component {...props} /> : <Navigate to="/login" />
//   }
// />

export default GuardedRoute;
