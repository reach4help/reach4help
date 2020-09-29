import React, { lazy, ReactElement, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import { AcceptedRequestsLocation } from './routes/AcceptedRequestsRoute/constants';
import { FindRequestsLocation } from './routes/FindRequestsRoute/constants';
import { NewRequestsLocation } from './routes/NewRequestsRoute/constants';
import { OpenRequestsLocation } from './routes/OpenRequestsRoute/constants';
import { MainLocation } from './routes/PostsRoute/constants';

const AcceptedRequestsRoute = lazy(() =>
  import('./routes/AcceptedRequestsRoute/AcceptedRequestsRoute'),
);

const FindRequestsRoute = lazy(() =>
  import('./routes/FindRequestsRoute/FindRequestsRoute'),
);

const NewRequestsRoute = lazy(() =>
  import('./routes/NewRequestsRoute/NewRequestsRoute'),
);

const OpenRequestsRoute = lazy(() =>
  import('./routes/OpenRequestsRoute/OpenRequestsRoute'),
);
/* ?? refactoring here - discuss */
const MainContainer = lazy(() =>
  import('../containers/MainContainer'),
);

const ContentPage = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route
        path={OpenRequestsLocation.path}
        component={OpenRequestsRoute}
        exact
      />
      <Route path={MainLocation.path} component={MainContainer} exact />
      <Route
        path={AcceptedRequestsLocation.path}
        component={AcceptedRequestsRoute}
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
