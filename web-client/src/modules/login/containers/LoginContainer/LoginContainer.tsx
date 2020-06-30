import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from 'src/store';

import {
  getFBLoginRedirectResult,
  LoginWithFBFirebaseActionPopUp,
  triggerFBLoginWithRedirect,
} from '../../../../ducks/auth/facebook/actions';
import {
  getGoogleLoginRedirectResult,
  loginWithGoogleFirebaseActionPopUp,
  triggerGoogleLoginWithRedirect,
} from '../../../../ducks/auth/google/actions';
import LoginFooter from '../../components/LoginFooter/LoginFooter';
import LoginSteps from '../../components/LoginSteps/LoginSteps';

const LoginContainer: React.FC<LoginRedirectProps> = ({
  redirectBack = '/',
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth.user);
  const error = useSelector((state: AppState) => state.auth.error);
  const history = useHistory();

  useEffect(() => {
    const redirectStarted = window.sessionStorage.getItem('redirect_started');
    if (redirectStarted) {
      const loginMethod = redirectStarted.split('_')[0];
      if (loginMethod === 'facebook') {
        dispatch(getFBLoginRedirectResult());
      } else {
        dispatch(getGoogleLoginRedirectResult());
      }
    }
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      history.replace(redirectBack);
    }
  }, [history, redirectBack, user]);

  const handleLoginGoogle = () => {
    if (isMobile) {
      dispatch(triggerGoogleLoginWithRedirect());
    } else {
      dispatch(loginWithGoogleFirebaseActionPopUp());
    }
  };

  const handleLoginFacebook = () => {
    if (isMobile) {
      dispatch(triggerFBLoginWithRedirect());
    } else {
      dispatch(LoginWithFBFirebaseActionPopUp());
    }
  };

  return (
    <>
      <LoginSteps
        onLoginGoogle={handleLoginGoogle}
        onLoginFacebook={handleLoginFacebook}
      />
      <LoginFooter />
      <div style={{ color: 'red', textAlign: 'center' }}>
        {error && error.message}
      </div>
    </>
  );
};

interface LoginRedirectProps {
  redirectBack?: string;
}

export default LoginContainer;
