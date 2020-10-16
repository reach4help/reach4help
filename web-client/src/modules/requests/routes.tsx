import React, { lazy, ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProtectedRoute from 'src/pages/routes/ProtectedRoute';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import {
  AcceptedRequestsLocation,
  FindRequestsLocation,
  ListMyPostsLocation,
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
      <ProtectedRoute
        path={AcceptedRequestsLocation.path}
        component={AcceptedRequestsContainer}
      />
      <ProtectedRoute
        path={FindRequestsLocation.path}
        component={FindRequestsContainer}
      />
      <ProtectedRoute
        path={OpenRequestsLocation.path}
        component={OpenRequestsContainer}
      />
      <ProtectedRoute
        path={ListMyPostsLocation.path}
        component={TabbedPostsPage}
      />
      <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  </Suspense>
);

export default Routes;
