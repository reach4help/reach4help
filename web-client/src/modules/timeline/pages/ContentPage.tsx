import React, { ReactElement } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { TimelineAcceptedViewLocation } from './routes/TimelineAcceptedViewRoute/constants';
import TimelineAcceptedViewRoute from './routes/TimelineAcceptedViewRoute/TimelineAcceptedViewRoute';
import { TimelineViewLocation } from './routes/TimelineViewRoute/constants';
import TimelineViewRoute from './routes/TimelineViewRoute/TimelineViewRoute';

const ContentPage = (): ReactElement => (
  <Switch>
    <Route
      path={TimelineViewLocation.path}
      component={TimelineViewRoute}
      exact
    />
    <Route
      path={TimelineAcceptedViewLocation.path}
      component={TimelineAcceptedViewRoute}
      exact
    />
    <Route path="*" component={() => <Redirect to="/404" />} />
  </Switch>
);

export default ContentPage;
