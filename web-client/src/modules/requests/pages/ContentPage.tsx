import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import AcceptedRequestsRoute from './routes/AcceptedRequestsRoute/AcceptedRequestsRoute';
import { AcceptedRequestsLocation } from './routes/AcceptedRequestsRoute/constants';
import ArchivedRequestsRoute from './routes/ArchivedRequestsRoute/ArchivedRequestsRoute';
import { ArchivedRequestsLocation } from './routes/ArchivedRequestsRoute/constants';
import { FindRequestsLocation } from './routes/FindRequestsRoute/constants';
import FindRequestsRoute from './routes/FindRequestsRoute/FindRequestsRoute';
import { FinishedRequestsLocation } from './routes/FinishedRequestsRoute/constants';
import FinishedRequestsRoute from './routes/FinishedRequestsRoute/FinishedRequestsRoute';
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
      path={AcceptedRequestsLocation.path}
      component={AcceptedRequestsRoute}
      exact
    />
    <Route
      path={OngoingRequestsLocation.path}
      component={OngoingRequestsRoute}
      exact
    />
    <Route
      path={FinishedRequestsLocation.path}
      component={FinishedRequestsRoute}
      exact
    />
    <Route
      path={ArchivedRequestsLocation.path}
      component={ArchivedRequestsRoute}
      exact
    />
    <Route
      path={FindRequestsLocation.path}
      component={FindRequestsRoute}
      exact
    />
  </Switch>
);

export default ContentPage;
