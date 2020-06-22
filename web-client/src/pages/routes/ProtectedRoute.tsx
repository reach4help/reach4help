import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import { observePrivileged, observeProfile } from 'src/ducks/profile/actions';
import { ProfileState } from 'src/ducks/profile/types';
import { PersonalDataLocation } from 'src/modules/personalData/pages/routes/PersonalDataRoute/constants';
import { RoleInfoLocation } from 'src/modules/personalData/pages/routes/RoleInfoRoute/constants';
import { PhoneEntryLocation } from 'src/modules/phone/pages/routes/PhoneEntryRoute/constants';
import { AppState } from 'src/store';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import { LoginLocation } from '../../modules/registration/pages/routes/LoginRoute/constants';

const ProtectedRoute: React.FC<RouteProps> = ({ path, component }) => {
  const auth = useSelector((state: AppState) => state.auth);
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect((): any => observeUserAction(dispatch), [dispatch]);

  useEffect((): any => {
    if (auth.user && auth.user.uid) {
      return observeProfile(dispatch, { uid: auth.user.uid });
    }
    return undefined;
  }, [dispatch, auth]);

  useEffect((): any => {
    if (auth.user && auth.user.uid) {
      return observePrivileged(dispatch, { uid: auth.user.uid });
    }
    return undefined;
  }, [dispatch, auth]);

  if (!auth.observerReceivedFirstUpdate || !auth.observerReceivedFirstUpdate) {
    return <LoadingWrapper />;
  }

  if (!auth.user) {
    return (
      <Redirect
        to={{
          pathname: LoginLocation.path,
          state: { redirectBack: `${location.pathname}${location.search}` },
        }}
      />
    );
  }

  if (!auth.user.phoneNumber) {
    return (
      <Redirect
        to={{
          pathname: PhoneEntryLocation.path,
          state: { redirectBack: `${location.pathname}${location.search}` },
        }}
      />
    );
  }

  if (
    !(
      profileState &&
      profileState.profile &&
      profileState.profile.displayName &&
      profileState.privilegedInformation?.address
    )
  ) {
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
