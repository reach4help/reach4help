import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { observeUserAction } from 'src/ducks/auth/actions';
import firebase from 'src/firebase';
import { AppState } from 'src/store';

import { LoginLocation } from './routes/LoginRoute/constants';

interface ProtectedPageProps {
  children: React.ReactNode;
}
const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const user: firebase.User = useSelector((state: AppState) => state.auth.user);
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

  return <>{children}</>;
};

export default ProtectedPage;
