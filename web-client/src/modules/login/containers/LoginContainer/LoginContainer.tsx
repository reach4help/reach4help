import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getLoginRedirectResult,
  loginWithFirebaseActionPopUp,
  triggerLoginWithRedirect,
} from 'src/ducks/auth/facebook/actions';
import { AppState } from 'src/store';

import Login from '../../components/Login/Login';

const LoginContainer: React.FC<LoginRedirectProps> = ({
  redirectBack = '/',
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth.user);
  const history = useHistory();

  useEffect(() => {
    const redirectStarted = window.sessionStorage.getItem('redirect_started');
    if (redirectStarted) {
      dispatch(getLoginRedirectResult());
    }
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      history.replace(redirectBack);
    }
  }, [history, redirectBack, user]);

  const handleLoginFacebook = () => {
    if (isMobile) {
      dispatch(triggerLoginWithRedirect());
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

interface LoginRedirectProps {
  redirectBack?: string;
}

export default LoginContainer;
