import React, { lazy, ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import { SettingsLocation } from './constants';

const SettingsContainer = lazy(() =>
  import('./containers/SettingsContainer/SettingsContainer'),
);

const Routes = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route path={SettingsLocation.path} component={SettingsContainer} exact />
      <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  </Suspense>
);

export default Routes;
