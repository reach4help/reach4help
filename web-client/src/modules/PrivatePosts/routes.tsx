import React, { lazy, ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import { PrivatePostsForPostLocation } from './constants';

const MyPostsTabs = lazy(() =>
  import('src/modules/postsTabsPage/pages/MyPostsTabsPage'),
);

const Routes = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      {/* TODO: (es) Decide on algolia or non algolia */}
      <Route path={PrivatePostsForPostLocation.path} component={MyPostsTabs} />
      <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  </Suspense>
);

export default Routes;
