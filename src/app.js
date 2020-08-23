import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import AppLogin from "./components/AppLogin";
import EmptyPage from "./components/Error/emptypage";
import GuardedRoute from "./utils/GuardedRoute";

import "./index.scss";
import "antd/dist/antd.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<Navigate to="/coreapp" replace />}
        ></Route>
        <Route exact path="/login" element={<AppLogin />} />
        <GuardedRoute exact path="/coreapp/*" element={<Navigation />} />
        <Route exact path="*" element={<EmptyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
