import React, { ReactElement } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AuthenticatedPage from './AuthenticatedPage';
import ContentPage from './ContentPage';
import PhoneVerificationPage from './PhoneVerificationPage';
import { LoginLocation } from './routes/LoginRoute/constants';
import LoginRoute from './routes/LoginRoute/LoginRoute';
import NotFoundRoute from './routes/NotFoundRoute';

const MasterPage = (): ReactElement => (
  <Router>
    <Switch>
      <Route path={LoginLocation.path} component={LoginRoute} exact />
      <AuthenticatedPage>
        <PhoneVerificationPage />
        <ContentPage />
      </AuthenticatedPage>
      <Route path="*">
        <NotFoundRoute />
      </Route>
    </Switch>
  </Router>
);

export default MasterPage;
