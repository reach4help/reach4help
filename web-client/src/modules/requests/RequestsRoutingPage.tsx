import React, { lazy, ReactElement, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import {
  FindRequestsLocation,
  NewRequestsLocation,
  TabbedRequestsLocation,
} from './constants';
import FindRequestsContainer from './containers/FindRequestsContainer';
import NewRequestsContainer from './containers/NewRequestsContainer';

/* ?? refactoring here - discuss */
const MainContainer = lazy(() => import('./containers/MainContainer'));

const ContentPage = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route
        path={TabbedRequestsLocation.path}
        component={MainContainer}
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
