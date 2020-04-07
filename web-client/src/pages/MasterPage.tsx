import React, { ReactElement } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ProtectedPage from './ProtectedPage';
import { LoginLocation } from './routes/LoginRoute/constants';
import LoginRoute from './routes/LoginRoute/LoginRoute';
import NotFoundRoute from './routes/NotFoundRoute';
import PhoneNumberRoute from './routes/PhoneVerificationRoutes/PhoneNumberPage';

const MasterPage = (): ReactElement => (
  <Router>
    <Switch>
      <Route path={LoginLocation.path} component={LoginRoute} exact />
      <ProtectedPage>
        <PhoneNumberRoute />
      </ProtectedPage>
      <Route path="*">
        <NotFoundRoute />
      </Route>
    </Switch>
  </Router>
);

export default MasterPage;
