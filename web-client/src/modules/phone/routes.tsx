import get from 'lodash/get';
import React, { lazy, ReactElement, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';
import { observeUserAction } from 'src/ducks/auth/actions';
import { LoginLocation } from 'src/modules/login/constants';
import { PersonalDataLocation } from 'src/modules/personalData/constants';
import { AppState } from 'src/store';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import { PhoneEntryLocation, PhoneVerifyLocation } from './constants';

const PhoneEntryContainer = lazy(() =>
  import('./containers/PhoneEntryContainer/PhoneEntryContainer'),
);

const PhoneVerifyContainer = lazy(() =>
  import('./containers/PhoneVerifyContainer/PhoneVerifyContainer'),
);

const PhoneEntryPage: React.FC = (): ReactElement => (
  <GradientBackground>
    <CenteredCard>
      <PhoneEntryContainer />
    </CenteredCard>
  </GradientBackground>
);

const PhoneVerifyPage: React.FC = (): ReactElement => (
  <GradientBackground>
    <CenteredCard>
      <PhoneVerifyContainer />
    </CenteredCard>
  </GradientBackground>
);

const Routes = (): ReactElement => {
  const user = useSelector((state: AppState) => state.auth.user);
  const loading = useSelector((state: AppState) => state.auth.loading);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect((): any => observeUserAction(dispatch), [dispatch]);
  const redirectBack = get(location, 'state.redirectBack');

  if (loading && !user) {
    return <LoadingWrapper />;
  }

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: LoginLocation.path,
          state: { redirectBack: redirectBack || '/' },
        }}
      />
    );
  }
  if (user.phoneNumber) {
    return (
      <Redirect
        to={{
          pathname: PersonalDataLocation.path,
          state: { redirectBack: redirectBack || '/' },
        }}
      />
    );
  }

  return (
    <Suspense fallback={<LoadingWrapper />}>
      <Switch>
        <Route
          path={PhoneEntryLocation.path}
          component={PhoneEntryPage}
          exact
        />
        <Route
          path={PhoneVerifyLocation.path}
          component={PhoneVerifyPage}
          exact
        />
        <Route path="*" render={() => <Redirect to="/404" />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
