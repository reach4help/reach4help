import React, { lazy, ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import { FindRequestsLocation, MyPostsLocation } from './constants';

const FindRequestsContainer = lazy(() =>
  import('./containers/FindRequestsContainer'),
);

const TabbedPostsPage = lazy(() => import('./pages/TabbedPostsPage'));

const Routes = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route
        path={FindRequestsLocation.path}
        component={FindRequestsContainer}
        exact
      />
      <Route path={MyPostsLocation.path} component={TabbedPostsPage} />
      <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  </Suspense>
);

export default Routes;
