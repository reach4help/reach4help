import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Login from 'src/components/Login/Login';
import {
  completeLoginWithFirebaseActionRedirect,
  loginWithFirebaseActionPopUp,
  loginWithFirebaseActionRedirect,
  observeUserAction,
} from 'src/ducks/auth/actions';
import { firebaseAuth } from 'src/firebase';
import { AppState } from 'src/store';

import { LoginRedirectProps } from './constants';

const LoginContainer: React.FC<LoginRedirectProps> = ({
  redirectBack = '/',
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state: AppState) => state.auth.token);
  // const user = useSelector((state: AppState) => state.auth.user);
  const history = useHistory();

  useEffect((): any => {
    // eslint-disable-next-line no-console
    console.log('here', observeUserAction(dispatch));
  });

  const redirectStarted = window.localStorage.getItem('redirect_started');
  if (redirectStarted) {
    firebaseAuth.getRedirectResult().then(result => {
      dispatch(completeLoginWithFirebaseActionRedirect(result));
    });
  }
  // // firebaseAuth.onAuthStateChanged((user: firebase.User | null) => {
  // if (user) {
  //   dispatch(completeLoginWithFirebaseActionRedirect({ user }));
  // }
  // // });

  useEffect(() => {
    if (token) {
      history.replace(redirectBack);
    }
  }, [token, history, redirectBack]);

  const handleLoginFacebook = () => {
    if (isMobile) {
      dispatch(loginWithFirebaseActionRedirect());
    } else {
      dispatch(loginWithFirebaseActionPopUp());
    }
  };

  return (
    <>
      <Login onLoginFacebook={handleLoginFacebook} />
    </>
  );
};

LoginContainer.propTypes = {};

export default LoginContainer;
