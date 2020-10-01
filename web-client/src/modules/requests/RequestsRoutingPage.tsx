import React, { lazy, ReactElement, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import {
  FindRequestsLocation,
  NewRequestsLocation,
  TabbedRequestsLocation,
} from './constants';

const FindRequestsContainer = lazy(() =>
  import('./containers/FindRequestsContainer'),
);

const NewRequestsContainer = lazy(() =>
  import('./containers/NewRequestsContainer'),
);

/* ?? refactoring here - discuss */
const TabbedRequestsContainer = lazy(() =>
  import('./containers/TabbedRequestsContainer'),
);

const RequestsRoutingPage = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route
        path={TabbedRequestsLocation.path}
        component={TabbedRequestsContainer}
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
