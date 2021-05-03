import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeComponent from './components/HomeComponent';
import ProgramListComponent from './components/program/ProgramListComponent';
import StepListComponent from './components/step/StepListComponent';

import './globals.css';
import { NavBarFunc } from './NavBarFunc';

function App() {
  const [showAdminMenu, setShowAdmin] = useState(false);
  let NavBar = () => { return (<div></div>) };
  NavBar = NavBarFunc(showAdminMenu, NavBar, setShowAdmin);

  return (
    <div>
      <nav className="navbar">
        <NavBar />
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route exact path="/program/list" component={ProgramListComponent} />
          <Route exact path="/step/list" component={StepListComponent} />
          <Route component={HomeComponent} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

