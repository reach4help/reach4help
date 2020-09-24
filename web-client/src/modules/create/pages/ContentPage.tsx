import React, { lazy, ReactElement, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingWrapper from 'src/components/LoadingComponent/LoadingComponent';

import { NewRequestsLocation } from './routes/NewRequestsRoute/constants';

const NewRequestContainerRoute = lazy(() =>
  import('./routes/NewRequestsRoute/NewRequestsRoute'),
);

const ContentPage = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route
        path={NewRequestsLocation.path}
        component={NewRequestContainerRoute}
        exact
      />
    </Switch>
  </Suspense>
);

export default ContentPage;
