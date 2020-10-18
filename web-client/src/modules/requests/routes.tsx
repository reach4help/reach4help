import React, { lazy, ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import {
  AcceptedRequestsLocation,
  FindRequestsLocation,
  MyPostsLocation,
  OpenRequestsLocation,
} from './constants';

const AcceptedRequestsContainer = lazy(() =>
  import('./containers/AcceptedRequestsContainer'),
);

const FindRequestsContainer = lazy(() =>
  import('./containers/FindRequestsContainer'),
);

const OpenRequestsContainer = lazy(() =>
  import('./containers/OpenRequestsContainer'),
);

const TabbedPostsPage = lazy(() => import('./pages/TabbedPostsPage'));

const Routes = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
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
        path={OpenRequestsLocation.path}
        component={OpenRequestsContainer}
        exact
      />
      <Route path={MyPostsLocation.path} component={TabbedPostsPage} />
      <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  </Suspense>
);

export default Routes;
