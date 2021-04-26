import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import ProgramList from "./components/program/ProgramList";

import "./App.css";



function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/program/list"} className="nav-link">
              Programs
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/program/create"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/program/list" component={ProgramList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
