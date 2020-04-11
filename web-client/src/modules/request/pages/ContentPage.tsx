import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFoundRoute from 'src/pages/routes/NotFoundRoute';

import { NewRequestLocation } from './routes/NewRequestRoute/constants';
import NewRequestRoute from './routes/NewRequestRoute/NewRequestRoute';

const ContentPage = (): ReactElement => (
  <Switch>
    <Route path={NewRequestLocation.path} component={NewRequestRoute} exact />
    <Route path="*" component={NotFoundRoute} />
  </Switch>
);

export default ContentPage;
