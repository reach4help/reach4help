import React, { lazy, ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import { TimelineAcceptedViewLocation } from './routes/TimelineAcceptedViewRoute/constants';
import { TimelineViewLocation } from './routes/TimelineViewRoute/constants';

const TimelineAcceptedViewRoute = lazy(() =>
  import('./routes/TimelineAcceptedViewRoute/TimelineAcceptedViewRoute'),
);
const TimelineViewRoute = lazy(() =>
  import('./routes/TimelineViewRoute/TimelineViewRoute'),
);

const ContentPage = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
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
  </Suspense>
);

export default ContentPage;
