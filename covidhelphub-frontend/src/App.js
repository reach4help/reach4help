import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import HomePage from './components/HomePage';
import ProgramCreate from './components/program/ProgramCreate';
import ProgramDisplay from './components/program/ProgramDisplay';
import ProgramList from './components/program/ProgramList';

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
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/program/create" component={ProgramCreate} />
          <Route exact path="/program/list" component={ProgramList} />
          <Route exact path="/program/display" component={ProgramDisplay} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
