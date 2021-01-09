import React, { lazy, ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import {
  AlgFindRequestsLocation,
  FindRequestsLocation,
  MyPostsLocation,
} from './constants';

// TODO: (es) Choose between Alg and NonAlg container
const AlgFindRequestsContainer = lazy(() =>
  import('./containers/FindRequestsAlgoliaContainer'),
);

const FindRequestsContainer = lazy(() =>
  import('./containers/FindRequestsContainer'),
);

const MyPostsTabs = lazy(() =>
  import('src/modules/postsTabsPage/pages/MyPostsTabsPage'),
);

const Routes = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      {/* TODO: (es) Decide on algolia or non algolia */}
      <Route
        path={FindRequestsLocation.path}
        component={FindRequestsContainer}
        exact
      />
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
