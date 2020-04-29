import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import { observePrivileged, observeProfile } from 'src/ducks/profile/actions';
import { ProfileState } from 'src/ducks/profile/types';
import { ApplicationPreference } from 'src/models/users';
import { LoginLocation } from 'src/modules/login/pages/routes/LoginRoute/constants';
import NotFoundRoute from 'src/pages/routes/NotFoundRoute';
import { AppState } from 'src/store';

import { PersonalDataLocation } from './routes/PersonalDataRoute/constants';
import PersonalDataRoute from './routes/PersonalDataRoute/PersonalDataRoute';
import { RoleInfoLocation } from './routes/RoleInfoRoute/constants';
import RoleInfoRoute from './routes/RoleInfoRoute/RoleInfoRoute';

const ContentPage = (): ReactElement => {
  const user = useSelector((state: AppState) => state.auth.user);
  const authLoading = useSelector((state: AppState) => state.auth.loading);
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect((): any => observeUserAction(dispatch), [dispatch]);

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
    return <>Loading</>;
  }

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: LoginLocation.path,
          state: { redirectBack: location.pathname },
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
            pathname: '/',
          }}
        />
      );
    }
    if (
      profileState.profile.applicationPreference === ApplicationPreference.cav
    ) {
      // TODO: Change to Route for CAV
      return (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      );
    }
    if (location.pathname !== RoleInfoLocation.path) {
      return (
        <Redirect
          to={{
            pathname: RoleInfoLocation.path,
          }}
        />
      );
    }
  }

  return (
    <Switch>
      <Route
        path={PersonalDataLocation.path}
        component={PersonalDataRoute}
        exact
      />
      <Route path={RoleInfoLocation.path} component={RoleInfoRoute} exact />
      <Route path="*" component={NotFoundRoute} />
    </Switch>
  );
};
export default ContentPage;
