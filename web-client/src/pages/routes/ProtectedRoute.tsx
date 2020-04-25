import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import { observePrivileged, observeProfile } from 'src/ducks/profile/actions';
import { LoginLocation } from 'src/modules/login/pages/routes/LoginRoute/constants';
import { PersonalDataLocation } from 'src/modules/personalData/pages/routes/PersonalDataRoute/constants';
import { PhoneEntryLocation } from 'src/modules/phone/pages/routes/PhoneEntryRoute/constants';
import { AppState } from 'src/store';

const ProtectedRoute: React.FC<RouteProps> = ({ path, component }) => {
  const auth = useSelector((state: AppState) => state.auth);
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

  if (!auth.observerReceivedFirstUpdate) {
    return <>Loading</>;
  }

  if (!auth.user) {
    return (
      <Redirect
        to={{
          pathname: LoginLocation.path,
          state: { redirectBack: location.pathname },
        }}
      />
    );
  }

  if (!auth.user.phoneNumber) {
    return (
      <Redirect
        to={{
          pathname: PhoneEntryLocation.path,
        }}
      />
    );
  }
  // FIXME this should check if the user hasn't yet filled "Personal Data form"
  // if(!auth.user.geolocation)
  // eslint-disable-next-line no-constant-condition
  if (true) {
    return (
      <Redirect
        to={{
          pathname: PersonalDataLocation.path,
        }}
      />
    );
  }

  return <Route path={path} component={component} />;
};

export default ProtectedRoute;
