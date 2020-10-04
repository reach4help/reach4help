import get from 'lodash/get';
import React, { lazy, ReactElement, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';
import { observeUserAction } from 'src/ducks/auth/actions';
import { observePrivileged, observeProfile } from 'src/ducks/profile/actions';
import { ProfileState } from 'src/ducks/profile/types';
import { ApplicationPreference } from 'src/models/users';
import { LoginLocation } from 'src/modules/login/pages/routes/LoginRoute/constants';
import {
  FindRequestsLocation,
  NewRequestsLocation,
} from 'src/modules/requests/constants';
import { AppState } from 'src/store';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import { PersonalDataLocation, RoleInfoLocation } from './constants';

const PersonalDataFormContainer = lazy(() =>
  import('./containers/PersonalDataFormContainer/PersonalDataFormContainer'),
);
const RoleInfoContainer = lazy(() =>
  import('./containers/RoleInfoContainer/RoleInfoContainer'),
);

const PersonalDataPage: React.FC = () => (
  <GradientBackground>
    <CenteredCard>
      <PersonalDataFormContainer />
    </CenteredCard>
  </GradientBackground>
);

const RoleInfoPage: React.FC = () => (
  <GradientBackground>
    <CenteredCard>
      <RoleInfoContainer />
    </CenteredCard>
  </GradientBackground>
);

const Routes = (): ReactElement => {
  const user = useSelector((state: AppState) => state.auth.user);
  const authLoading = useSelector((state: AppState) => state.auth.loading);
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect((): any => observeUserAction(dispatch), [dispatch]);
  const redirectBack = get(location, 'state.redirectBack');

  useEffect((): any => {
    if (user && user.uid) {
      return observeProfile(dispatch, { uid: user.uid });
    }
    return undefined;
  }, [dispatch, user]);

  useEffect((): any => {
    if (user && user.uid) {
      return observePrivileged(dispatch, { uid: user.uid });
    }
    return undefined;
  }, [dispatch, user]);

  if (
    (authLoading && !user) ||
    (profileState.loading && !profileState.profile)
  ) {
    return <LoadingWrapper />;
  }

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: LoginLocation.path,
          state: {
            redirectBack:
              redirectBack || `${location.pathname}${location.search}`,
          },
        }}
      />
    );
  }

  if (
    profileState &&
    profileState.profile &&
    profileState.profile.displayName
  ) {
    if (
      profileState.profile.applicationPreference === ApplicationPreference.pin
    ) {
      return (
        <Redirect
          to={{
            pathname: redirectBack || NewRequestsLocation.path,
          }}
        />
      );
    }
    if (
      profileState.profile.applicationPreference === ApplicationPreference.cav
    ) {
      return (
        <Redirect
          to={{
            pathname: redirectBack || FindRequestsLocation.path,
          }}
        />
      );
    }
    if (location.pathname !== RoleInfoLocation.path) {
      return (
        <Redirect
          to={{
            pathname: RoleInfoLocation.path,
            state: { redirectBack: redirectBack || '/' },
          }}
        />
      );
    }
  }

  return (
    <Suspense fallback={<LoadingWrapper />}>
      <Switch>
        <Route
          path={PersonalDataLocation.path}
          component={PersonalDataPage}
          exact
        />
        <Route path={RoleInfoLocation.path} component={RoleInfoPage} exact />
        <Route path="*" render={() => <Redirect to="/404" />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
