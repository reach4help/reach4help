import React, { lazy, ReactElement, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import { AcceptedRequestsLocation, FindRequestsLocation, MainLocation, NewRequestsLocation, OpenRequestsLocation } from '../constants';

const AcceptedRequestsContainer = lazy(() =>
  import('../containers/AcceptedRequestsContainer'),
);

const FindRequestsContainer = lazy(() =>
  import('../containers/FindRequestsContainer'),
);

const NewRequestsContainer = lazy(() =>
  import('../containers/NewRequestsContainer'),
);

const OpenRequestsContainer = lazy(() =>
  import('../containers/OpenRequestsContainer'),
);
/* ?? refactoring here - discuss */
const MainContainer = lazy(() =>
  import('../containers/MainContainer'),
);

const ContentPage = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route
        path={OpenRequestsLocation.path}
        component={OpenRequestsContainer}
        exact
      />
      <Route path={MainLocation.path} component={MainContainer} exact />
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

export default ContentPage;
