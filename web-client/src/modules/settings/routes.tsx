import React, { lazy, ReactElement, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFoundRoute from 'src/pages/routes/NotFoundRoute';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import { SettingsLocation } from './constants';

const SettingsContainer = lazy(() =>
  import('./containers/SettingsContainer/SettingsContainer'),
);

const Routes = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route path={SettingsLocation.path} component={SettingsContainer} exact />
      <Route path="*" component={NotFoundRoute} />
    </Switch>
  </Suspense>
);

export default Routes;
