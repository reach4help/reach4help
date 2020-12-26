import React, { lazy, ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import { AlgFindRequestsLocation, MyPostsLocation } from './constants';

// TODO: (es) Choose between Alg and NonAlg container
const AlgFindRequestsContainer = lazy(() =>
  import('./containers/FindRequestsAlgoliaContainer'),
);

const MyPostsTabs = lazy(() =>
  import('src/modules/postsTabsPage/pages/MyPostsTabsPage'),
);

const Routes = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route
        path={AlgFindRequestsLocation.path}
        component={AlgFindRequestsContainer}
        exact
      />
      <Route path={MyPostsLocation.path} component={MyPostsTabs} />
      <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  </Suspense>
);

export default Routes;
