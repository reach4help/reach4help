import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFoundRoute from 'src/pages/routes/NotFoundRoute';

import { PersonalDataLocation } from './routes/PersonalDataRoute/constants';
import PersonalDataRoute from './routes/PersonalDataRoute/PersonalDataRoute';

const ContentPage = (): ReactElement => (
  <Switch>
    <Route
      path={PersonalDataLocation.path}
      component={PersonalDataRoute}
      exact
    />
    <Route path="*" component={NotFoundRoute} />
  </Switch>
);

export default ContentPage;
