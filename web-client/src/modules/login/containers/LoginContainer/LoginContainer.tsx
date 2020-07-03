import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingWrapper from 'src/components/LoadingComponent/LoadingComponent';
import { AppState } from 'src/store';

import {
  checkEmail as checkEmailFunc,
  signIn,
  signUp,
} from '../../../../ducks/auth/email/actions';
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
import { authProviders } from '../../../../ducks/auth/types';
import LoginFooter from '../../components/LoginFooter/LoginFooter';
import RegistrationSteps from '../../components/RegistrationSteps/RegistrationSteps';

const LoginContainer: React.FC<LoginRedirectProps> = ({
  redirectBack = '/',
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth.user);
  const error = useSelector((state: AppState) => state.auth.error);
  const checkEmail = useSelector((state: AppState) => state.auth.checkEmail);
  const authLoading = useSelector((state: AppState) => state.auth.loading);
  const history = useHistory();

  const [emailAndPassword, setEmailAndPassword] = useState<
    Record<string, string>
  >({});
  const [currentStep, setCurrentStep] = useState<number>(0);

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

  useEffect(() => {
    if (!authLoading) {
      let shouldCheck = true;
      if (checkEmail && !checkEmail.loading) {
        if (checkEmail.present) {
          if (checkEmail.method === authProviders.email) {
            if (
              checkEmail.intermediateData.email &&
              checkEmail.intermediateData.password
            ) {
              dispatch(
                signIn({
                  email: checkEmail.intermediateData.email,
                  password: checkEmail.intermediateData.password,
                }),
              );
              shouldCheck = false;
            }
          } else {
            // the actions to take when the email provided is being used for another login provider like Google/Facebook
          }
        } else if (
          checkEmail.intermediateData.email &&
          checkEmail.intermediateData.password
        ) {
          dispatch(
            signUp({
              email: checkEmail.intermediateData.email,
              password: checkEmail.intermediateData.password,
            }),
          );
          shouldCheck = false;
        }
      }
      if (
        shouldCheck &&
        emailAndPassword.email &&
        !(checkEmail && checkEmail.loading)
      ) {
        dispatch(
          checkEmailFunc({
            email: emailAndPassword.email,
            password: emailAndPassword.password,
          }),
        );
      }
    }
  }, [authLoading, checkEmail, emailAndPassword, dispatch]);

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

  const handleEmailSignInUp = (email: string, password: string) => {
    if (email && password) {
      setEmailAndPassword({
        email,
        password,
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const checkEmailExists = (email: string) => {
    if (email) {
      setEmailAndPassword({
        email,
      });
    }
  };

  if (authLoading) {
    return <LoadingWrapper />;
  }

  return (
    <>
      <RegistrationSteps
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onLoginGoogle={handleLoginGoogle}
        onLoginFacebook={handleLoginFacebook}
        onEmailSignInUp={handleEmailSignInUp}
      />
      <LoginFooter />
      <div style={{ color: 'red', textAlign: 'center' }}>
        {error && error.message}
        {(() => {
          if (checkEmail && checkEmail.method !== authProviders.email) {
            return `You must use ${checkEmail.method} to login`;
          }
        })()}
      </div>
    </>
  );
};

interface LoginRedirectProps {
  redirectBack?: string;
}

export default LoginContainer;
