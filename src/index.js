import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import "antd/dist/antd.css";
import Navigation from "./components/Navigation";

const App = () => (
  <>
    <Router>
      <Navigation />
    </Router>
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
