import React, { lazy, ReactElement, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import { AcceptedRequestsLocation, FindRequestsLocation, TabbedRequestsLocation, NewRequestsLocation, OpenRequestsLocation } from '../constants';

const AcceptedRequestsContainer = lazy(() =>
  import('./AcceptedRequestsContainer'),
);

const FindRequestsContainer = lazy(() =>
  import('./FindRequestsContainer'),
);

const NewRequestsContainer = lazy(() =>
  import('./NewRequestsContainer'),
);

const OpenRequestsContainer = lazy(() =>
  import('./OpenRequestsContainer'),
);
/* ?? refactoring here - discuss */
const TabbedRequestsContainer = lazy(() =>
  import('./TabbedRequestsContainer'),
);

const RequestsRoutingPage = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route
        path={OpenRequestsLocation.path}
        component={OpenRequestsContainer}
        exact
      />
      <Route path={TabbedRequestsLocation.path} component={TabbedRequestsContainer} exact />
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
