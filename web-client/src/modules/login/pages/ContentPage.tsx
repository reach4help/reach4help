import get from 'lodash/get';
import React, { lazy, ReactElement, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import LoadingWrapper from 'src/components/LoadingWrapper/LoadingWrapper';
import { observeUserAction } from 'src/ducks/auth/actions';
import NotFoundRoute from 'src/pages/routes/NotFoundRoute';
import { AppState } from 'src/store';

import { LoginLocation } from './routes/LoginRoute/constants';

const LoginRoute = lazy(() => import('./routes/LoginRoute/LoginRoute'));

const ContentPage = (): ReactElement => {
  const user = useSelector((state: AppState) => state.auth.user);
  const observerReceivedFirstUpdate = useSelector(
    (state: AppState) => state.auth.observerReceivedFirstUpdate,
  );
  const dispatch = useDispatch();

  useEffect((): any => observeUserAction(dispatch), [dispatch]);

  const location = useLocation();
  const redirectBack = get(location, 'state.redirectBack') || '/';

  if (!observerReceivedFirstUpdate) {
    return <LoadingWrapper />;
  }

  if (user) {
    return (
      <Redirect
        to={{
          pathname: redirectBack,
        }}
      />
    );
  }
  return (
    <Suspense fallback={<LoadingWrapper />}>
      <Switch>
        <Route path={LoginLocation.path} component={LoginRoute} exact />
        <Route path="*" component={NotFoundRoute} />
      </Switch>
    </Suspense>
  );
};

export default ContentPage;
