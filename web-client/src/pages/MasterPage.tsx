import React, { ReactElement } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// import modules from '../modules';
import LoginModule from '../modules/login';
import AuthenticatedPage from './AuthenticatedPage';
import ContentPage from './ContentPage';

const MasterPage = (): ReactElement => (
  <Router>
    <Switch>
      <Route component={LoginModule.component} path={LoginModule.path} />
      <Route path="*">
        <AuthenticatedPage>
          <ContentPage />
        </AuthenticatedPage>
      </Route>
    </Switch>
  </Router>
);
export default MasterPage;
