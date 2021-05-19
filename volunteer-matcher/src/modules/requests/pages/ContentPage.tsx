import React, { lazy, ReactElement, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import { AcceptedRequestsLocation } from './routes/AcceptedRequestsRoute/constants';
import { ArchivedRequestsLocation } from './routes/ArchivedRequestsRoute/constants';
import { FindRequestsLocation } from './routes/FindRequestsRoute/constants';
import { FinishedRequestsLocation } from './routes/FinishedRequestsRoute/constants';
import { NewRequestsLocation } from './routes/NewRequestsRoute/constants';
import { OngoingRequestsLocation } from './routes/OngoingRequestsRoute/constants';
import { OpenRequestsLocation } from './routes/OpenRequestsRoute/constants';

const AcceptedRequestsRoute = lazy(() =>
  import('./routes/AcceptedRequestsRoute/AcceptedRequestsRoute'),
);
const ArchivedRequestsRoute = lazy(() =>
  import('./routes/ArchivedRequestsRoute/ArchivedRequestsRoute'),
);
const FindRequestsRoute = lazy(() =>
  import('./routes/FindRequestsRoute/FindRequestsRoute'),
);
const FinishedRequestsRoute = lazy(() =>
  import('./routes/FinishedRequestsRoute/FinishedRequestsRoute'),
);
const NewRequestsRoute = lazy(() =>
  import('./routes/NewRequestsRoute/NewRequestsRoute'),
);
const OngoingRequestsRoute = lazy(() =>
  import('./routes/OngoingRequestsRoute/OngoingRequestsRoute'),
);
const OpenRequestsRoute = lazy(() =>
  import('./routes/OpenRequestsRoute/OpenRequestsRoute'),
);

const ContentPage = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route
        path={OpenRequestsLocation.path}
        component={OpenRequestsRoute}
        exact
      />
      <Route
        path={AcceptedRequestsLocation.path}
        component={AcceptedRequestsRoute}
        exact
      />
      <Route
        path={OngoingRequestsLocation.path}
        component={OngoingRequestsRoute}
        exact
      />
      <Route
        path={FinishedRequestsLocation.path}
        component={FinishedRequestsRoute}
        exact
      />
      <Route
        path={ArchivedRequestsLocation.path}
        component={ArchivedRequestsRoute}
        exact
      />
      <Route
        path={FindRequestsLocation.path}
        component={FindRequestsRoute}
        exact
      />
      <Route
        path={NewRequestsLocation.path}
        component={NewRequestsRoute}
        exact
      />
    </Switch>
  </Suspense>
);

export default ContentPage;
