import get from 'lodash/get';
import React, { lazy, ReactElement, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import { observePrivileged, observeProfile } from 'src/ducks/profile/actions';
import { ProfileState } from 'src/ducks/profile/types';
import { ApplicationPreference } from 'src/models/users';
import { FindRequestsLocation } from 'src/modules/requests/pages/routes/FindRequestsRoute/constants';
import { NewRequestsLocation } from 'src/modules/requests/pages/routes/NewRequestsRoute/constants';
import NotFoundRoute from 'src/pages/routes/NotFoundRoute';
import { AppState } from 'src/store';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import { LoginLocation } from '../../login/pages/routes/LoginRoute/constants';
import { PersonalDataLocation } from './routes/PersonalDataRoute/constants';
import { RoleInfoLocation } from './routes/RoleInfoRoute/constants';

const PersonalDataRoute = lazy(() =>
  import('./routes/PersonalDataRoute/PersonalDataRoute'),
);
const RoleInfoRoute = lazy(() =>
  import('./routes/RoleInfoRoute/RoleInfoRoute'),
);

const ContentPage = (): ReactElement => {
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
          state: { redirectBack: redirectBack || '/' },
        }}
      />
    );
  }

  if (
    profileState &&
    profileState.profile &&
    profileState.profile.displayName &&
    profileState.privilegedInformation?.address
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
          component={PersonalDataRoute}
          exact
        />
        <Route path={RoleInfoLocation.path} component={RoleInfoRoute} exact />
        <Route path="*" component={NotFoundRoute} />
      </Switch>
    </Suspense>
  );
};
export default ContentPage;
