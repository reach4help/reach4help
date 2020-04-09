import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Login from 'src/components/Login/Login';
import {
  getLoginRedirectResult,
  loginWithFirebaseActionPopUp,
  observeUserAction,
  triggerLoginWithRedirect,
} from 'src/ducks/auth/actions';
import { AppState } from 'src/store';

import { LoginRedirectProps } from './constants';

const LoginContainer: React.FC<LoginRedirectProps> = ({
  redirectBack = '/',
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth.user);
  const history = useHistory();
  const loading = useSelector((state: AppState) => state.auth.loading);
  useEffect((): any => observeUserAction(dispatch), [dispatch]);

  useEffect(() => {
    const redirectStarted = window.localStorage.getItem('redirect_started');
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
  if (loading) {
    return <>loading</>;
  }
  return (
    <>
      <Login onLoginFacebook={handleLoginFacebook} />
    </>
  );
};

LoginContainer.propTypes = {};

export default LoginContainer;
