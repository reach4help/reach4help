import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import HomeComponent from './components/HomeComponent';
import ProgramListComponent from './components/program/ProgramListComponent';
import StepListComponent from './components/step/StepListComponent';

import './globals.css';

function App() {
  const [showAdminMenu, setShowAdmin] = useState(false);
  let NavBar = () => { return (<div></div>) };
  if (showAdminMenu) {
    NavBar = () => {
      return (
        <div>
          <Link to={'/'} className="nav-link">
            <span onClick={() => setShowAdmin(false)}>Home</span>
          </Link>
          <Link to={'/program/list'} className="nav-link">
            Programs
          </Link>
          <Link to={'/step/list'} className="nav-link">
            Steps
          </Link>
          <Link to={'/email/list'} className="nav-link tbd-font">
            eMail Templates
          </Link>
          <Link to={'/text/list'} className="nav-link tbd-font">
            Text Templates
          </Link>
          <Link to={'/question/list'} className="nav-link tbd-font">
            Question
          </Link>
        </div>
      );
    };
  } else {
    NavBar = () => {
      return (
        <div>
          <Link to={'/admin'} className="nav-link">
            <span onClick={() => setShowAdmin(true)}>Admin</span>
          </Link>
          <Link to={'/request/list'} className="nav-link tbd-font">
            Requests
          </Link>
          <Link to={'/volunteer/list'} className="nav-link tbd-font">
            Volunteer
          </Link>
          <Link to={'/volunteer/list'} className="nav-link tbd-font">
            Beneficiaries
          </Link>
        </div>
      );
    };
  }

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
