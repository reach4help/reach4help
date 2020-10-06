import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import { observePrivileged, observeProfile } from 'src/ducks/profile/actions';
import { ProfileState } from 'src/ducks/profile/types';
import {
  PersonalDataLocation,
  RoleInfoLocation,
} from 'src/modules/personalData/constants';
import { AppState } from 'src/store';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import { LoginLocation } from '../../modules/login/constants';

const ProtectedRoute: React.FC<RouteProps> = ({ path, component }) => {
  const user = useSelector((state: AppState) => state.auth.user);
  const observerReceivedFirstUpdate = useSelector(
    (state: AppState) => state.auth.observerReceivedFirstUpdate,
  );
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

  if (!observerReceivedFirstUpdate) {
    return <LoadingWrapper />;
  }

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: LoginLocation.path,
          state: { redirectBack: `${location.pathname}${location.search}` },
        }}
      />
    );
  }

  if (
    !(
      profileState.observerReceivedFirstUpdate &&
      profileState.privilegedObserverReceivedFirstUpdate
    )
  ) {
    return <LoadingWrapper />;
  }

  if (!(profileState && profileState.profile?.displayName)) {
    return (
      <Redirect
        to={{
          pathname: PersonalDataLocation.path,
          state: { redirectBack: `${location.pathname}${location.search}` },
        }}
      />
    );
  }

  if (!profileState.profile.applicationPreference) {
    return (
      <Redirect
        to={{
          pathname: RoleInfoLocation.path,
          state: { redirectBack: `${location.pathname}${location.search}` },
        }}
      />
    );
  }

  return <Route path={path} component={component} />;
};

export default ProtectedRoute;
