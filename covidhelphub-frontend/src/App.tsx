import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeComponent from './components/HomeComponent';
import ProgramListComponent from './components/program/ProgramListComponent';
import RequestListComponent from './components/request/RequestListComponent';
import RequestCreateComponent from './components/request/RequestCreateComponent';
import StepListComponent from './components/step/StepListComponent';

import './globals.css';
import { NavBarFunc } from './NavBarFunc';
import ProgramRequestSelection from './components/request/RequestProgramSelection';

function App() {
  const NavBar = NavBarFunc();

  // TODO: rethink lines for request/list with multiple parameters - combine?
  return (
    <div>
      <nav className="navbar">
        <NavBar />
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route path="/request/list/:programCode/:stepCode" component={RequestListComponent} />
          <Route path="/request/list/:programCode" component={RequestListComponent} />
          <Route exact path="/request/list" component={ProgramRequestSelection} />
          <Route exact path="/request/create" component={RequestCreateComponent} />
          <Route exact path="/program/list" component={ProgramListComponent} />
          <Route exact path="/step/list" component={StepListComponent} />
          <Route component={HomeComponent} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

