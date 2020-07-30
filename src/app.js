import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import AppLogin from "./components/AppLogin";

import "./index.scss";
import "antd/dist/antd.css";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Router>
      <Routes>
        {!isAuth && <Navigate to="/login" replace />}
        <Route
          exact
          path="/"
          element={<Navigate to="/coreapp" replace />}
        ></Route>
        <Route exact path="/login" element={<AppLogin />} />
        <Route exact path="/coreapp/*" element={<Navigation />} />
      </Routes>
    </Router>
  );
};

export default App;
