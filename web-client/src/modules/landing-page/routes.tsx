import React, { lazy, ReactElement, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import { AboutPageLocation, HomePageLocation } from './constants';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

const Routes = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route path={HomePageLocation.path} component={HomePage} exact />
      <Route path={AboutPageLocation.path} component={AboutPage} exact />
    </Switch>
  </Suspense>
);

export default Routes;
