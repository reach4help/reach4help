import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import firebase from 'src/firebase';
import { AppState } from 'src/store';

import { LoginLocation } from './routes/LoginRoute/constants';
import {
  PhoneEntry,
  PhoneVerify,
} from './routes/PhoneVerificationRoutes/constants';

interface ProtectedPageProps {
  children: React.ReactNode;
}
const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const user: firebase.User = useSelector((state: AppState) => state.auth.user);
  const auth = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect((): any => observeUserAction(dispatch), [dispatch]);
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
  if (!(user && user.phoneNumber)) {
    if (
      auth.confirmationResult &&
      !window.location.pathname.includes('/phone/verify')
    ) {
      return (
        <Redirect
          to={{
            pathname: PhoneVerify.path,
          }}
        />
      );
    }
    if (!window.location.pathname.includes('/phone')) {
      return (
        <Redirect
          to={{
            pathname: PhoneEntry.path,
          }}
        />
      );
    }
  }
  if (
    user &&
    user.phoneNumber &&
    (window.location.pathname.includes('/phone') ||
      window.location.pathname.includes('/login'))
  ) {
    return <Redirect to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedPage;
