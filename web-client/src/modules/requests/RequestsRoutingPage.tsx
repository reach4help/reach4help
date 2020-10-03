import React, { lazy, ReactElement, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import {
  AcceptedRequestsLocation,
  FindRequestsLocation,
  NewRequestsLocation,
  OpenRequestsLocation,
  TabbedRequestsLocation,
} from './constants';

const AcceptedRequestsContainer = lazy(() =>
  import('./containers/AcceptedRequestsContainer'),
);

const FindRequestsContainer = lazy(() =>
  import('./containers/FindRequestsContainer'),
);

const NewRequestsContainer = lazy(() =>
  import('./containers/NewRequestsContainer'),
);

const OpenRequestsContainer = lazy(() =>
  import('./containers/OpenRequestsContainer'),
);
/* ?? refactoring here - discuss */
const TabbedRequestsContainer = lazy(() =>
  import('./containers/TabbedRequestsContainer'),
);

const RequestsRoutingPage = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route
        path={OpenRequestsLocation.path}
        component={OpenRequestsContainer}
        exact
      />
      <Route
        path={TabbedRequestsLocation.path}
        component={TabbedRequestsContainer}
      />
      <Route
        path={AcceptedRequestsLocation.path}
        component={AcceptedRequestsContainer}
        exact
      />
      <Route
        path={FindRequestsLocation.path}
        component={FindRequestsContainer}
        exact
      />
      <Route
        path={NewRequestsLocation.path}
        component={NewRequestsContainer}
        exact
      />
    </Switch>
  </Suspense>
);

export default RequestsRoutingPage;
