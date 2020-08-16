import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import LoadingWrapper from 'src/components/LoadingComponent/LoadingComponent';
import { AppState } from 'src/store';
import styled from 'styled-components';

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

const LoginContainer: React.FC<LoginRedirectProps> = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: AppState) => state.auth.error);
  const checkEmail = useSelector((state: AppState) => state.auth.checkEmail);
  const authLoading = useSelector((state: AppState) => state.auth.loading);

  const [emailAndPassword, setEmailAndPassword] = useState<
    Record<string, string>
  >({});
  const [shouldCheck, setShouldCheck] = useState<boolean>(false);
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
    if (!authLoading) {
      if (
        !shouldCheck &&
        checkEmail &&
        !checkEmail.loading &&
        emailAndPassword.email &&
        emailAndPassword.password &&
        emailAndPassword.action
      ) {
        if (checkEmail.present) {
          if (checkEmail.method === authProviders.email) {
            if (emailAndPassword.action === 'signin') {
              dispatch(
                signIn({
                  email: emailAndPassword.email,
                  password: emailAndPassword.password,
                }),
              );
            }
          } else {
            // the actions to take when the email provided is being used for another login provider like Google/Facebook
          }
        } else if (emailAndPassword.action === 'signup') {
          dispatch(
            signUp({
              email: emailAndPassword.email,
              password: emailAndPassword.password,
            }),
          );
        }
        setEmailAndPassword({});
      }
      if (
        shouldCheck &&
        emailAndPassword.email &&
        !(checkEmail && checkEmail.loading)
      ) {
        setShouldCheck(false);
        dispatch(
          checkEmailFunc({
            email: emailAndPassword.email,
            password: emailAndPassword.password,
          }),
        );
      }
    }
  }, [authLoading, checkEmail, emailAndPassword, shouldCheck, dispatch]);

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

  const handleEmailSignIn = (email: string, password: string) => {
    if (email && password) {
      setShouldCheck(true);
      setEmailAndPassword({
        email,
        password,
        action: 'signin',
      });
    }
  };

  const handleEmailSignUp = (email: string, password: string) => {
    if (email && password) {
      setShouldCheck(true);
      setEmailAndPassword({
        email,
        password,
        action: 'signup',
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const checkEmailExists = (email: string) => {
    if (email) {
      setShouldCheck(true);
      setEmailAndPassword({
        email,
      });
    }
  };

  if (authLoading) {
    return <LoadingWrapper />;
  }

  return (
    <LoginContainerWrapper>
      <RegistrationSteps
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onLoginGoogle={handleLoginGoogle}
        onLoginFacebook={handleLoginFacebook}
        onEmailSignIn={handleEmailSignIn}
        onEmailSignUp={handleEmailSignUp}
      />
      <LoginFooter />
      <div style={{ color: 'red', textAlign: 'center', marginBottom: '40px' }}>
        {error && error.message}
        {(() => {
          if (
            checkEmail &&
            !checkEmail.loading &&
            checkEmail.method &&
            checkEmail.present
          ) {
            if (checkEmail.method !== authProviders.email) {
              return `You must use ${checkEmail.method} to login`;
            }
            if (currentStep === 3) {
              return 'You already have an account, please Sign In!';
            }
          }
          if (currentStep === 2 && checkEmail && !checkEmail.present) {
            return "We don't have an account with this email in our system, Please Sign Up!";
          }
        })()}
      </div>
    </LoginContainerWrapper>
  );
};

const LoginContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
interface LoginRedirectProps {
  redirectBack?: string;
}

export default LoginContainer;
