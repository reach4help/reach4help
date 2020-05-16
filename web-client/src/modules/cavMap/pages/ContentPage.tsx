import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import CavMapRoute from './routes/CavMapRoute/CavMapRoute';
import { CavMapLocation } from './routes/CavMapRoute/constants';

const ContentPage = (): ReactElement => (
  <Switch>
    <Route
      path={CavMapLocation.path}
      component={CavMapRoute}
      exact
    />
    <Route path="*" component={() => <Redirect to="/404" />} />
  </Switch>
);
export default ContentPage;
