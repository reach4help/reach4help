import get from 'lodash/get';
import React, { lazy, ReactElement, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';
import IntroWrapper from 'src/components/IntroComponent/IntroComponent';
import { observeUserAction } from 'src/ducks/auth/actions';
import { AppState } from 'src/store';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import { LoginLocation } from './constants';

const LoginContainer = lazy(() =>
  import('./containers/LoginContainer/LoginContainer'),
);

const LoginPage: React.FC = (): ReactElement => {
  const location = useLocation();
  return (
    <GradientBackground>
      <CenteredCard>
        <IntroWrapper>
          <LoginContainer redirectBack={get(location, 'state.redirectBack')} />
        </IntroWrapper>
      </CenteredCard>
    </GradientBackground>
  );
};

const Routes = (): ReactElement => {
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
        <Route path={LoginLocation.path} component={LoginPage} exact />
        <Route path="*" render={() => <Redirect to="/404" />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
