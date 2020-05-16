import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import CompletedRequestsRoute from './routes/CompletedRequestsRoute/CompletedRequestsRoute';
import { CompletedRequestsLocation } from './routes/CompletedRequestsRoute/constants';
import { OngoingRequestsLocation } from './routes/OngoingRequestsRoute/constants';
import OngoingRequestsRoute from './routes/OngoingRequestsRoute/OngoingRequestsRoute';
import { OpenRequestsLocation } from './routes/OpenRequestsRoute/constants';
import OpenRequestsRoute from './routes/OpenRequestsRoute/OpenRequestsRoute';

const ContentPage = (): ReactElement => (
  <Switch>
    <Route
      path={OpenRequestsLocation.path}
      component={OpenRequestsRoute}
      exact
    />
    <Route
      path={OngoingRequestsLocation.path}
      component={OngoingRequestsRoute}
      exact
    />
    <Route
      path={CompletedRequestsLocation.path}
      component={CompletedRequestsRoute}
      exact
    />
  </Switch>
);

export default ContentPage;
