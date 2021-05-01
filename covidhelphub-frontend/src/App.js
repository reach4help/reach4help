import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import HomeComponent from './components/HomeComponent';
import ProgramListComponent from './components/program/ProgramListComponent';
import StepListComponent from './components/step/StepListComponent';

import './globals.css';

function App() {
  return (
    <div>
      <nav className="navbar">
        <Link to={'/program/list'} className="nav-link">
          Programs
        </Link>
        <Link to={''} className="nav-link">
          Requests
        </Link>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route exact path="/program/list" component={ProgramListComponent} />
          <Route exact path="/step/list" component={StepListComponent} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
