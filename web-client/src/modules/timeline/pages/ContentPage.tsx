import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { TimelineViewLocation } from './routes/TimelineViewRoute/constants';
import TimelineViewContainer from './routes/TimelineViewRoute/TimelineViewRoute';

const ContentPage = (): ReactElement => (
  <Switch>
    <Route
      path={TimelineViewLocation.path}
      component={TimelineViewContainer}
      exact
    />
    <Route path="*" component={() => <Redirect to="/404" />} />
  </Switch>
);

export default ContentPage;
