import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFoundRoute from 'src/pages/routes/NotFoundRoute';

import { NewRequestLocation } from './routes/NewRequestRoute/constants';
import NewRequestRoute from './routes/NewRequestRoute/NewRequestRoute';
import { NewRequestSuccessLocation } from './routes/NewRequestSuccessRoute/constants';
import NewRequestSuccessRoute from './routes/NewRequestSuccessRoute/NewRequestSuccessRoute';

const ContentPage = (): ReactElement => (
  <Switch>
    <Route path={NewRequestLocation.path} component={NewRequestRoute} exact />
    <Route
      path={NewRequestSuccessLocation.path}
      component={NewRequestSuccessRoute}
      exact
    />
    <Route path="*" component={NotFoundRoute} />
  </Switch>
);

export default ContentPage;
