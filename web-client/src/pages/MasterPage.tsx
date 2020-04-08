import React, { ReactElement } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ContentPage from './ContentPage';
import ProtectedPage from './ProtectedPage';
import { LoginLocation } from './routes/LoginRoute/constants';
import LoginRoute from './routes/LoginRoute/LoginRoute';
import NotFoundRoute from './routes/NotFoundRoute';

const MasterPage = (): ReactElement => (
  <Router>
    <Switch>
      <Route path={LoginLocation.path} component={LoginRoute} exact />
      <ProtectedPage>
        <ContentPage />
      </ProtectedPage>
      <Route path="*">
        <NotFoundRoute />
      </Route>
    </Switch>
  </Router>
);

export default MasterPage;
