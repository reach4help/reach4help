import React from 'react';
import { useTranslation } from 'react-i18next';
import logoSmall from 'src/assets/logoSmall.png';
import {
  H6Font,
  LoginButtonContainer,
  LogoWrapper,
} from 'src/components/figma/';

import FacebookLoginButton from '../FacebookLoginButton/FacebookLoginButton';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';

const StepAuthentication: React.FC<StepAuthenticationProps> = ({
  onLoginGoogle,
  onLoginFacebook,
}): React.ReactElement<StepAuthenticationProps> => {
  const { t } = useTranslation();

  return (
    <>
      <LogoWrapper>
        <img src={logoSmall} alt="logo" height="125px" width="125px" />
      </LogoWrapper>

      <LoginButtonContainer>
        <H6Font>{t('login.steps.3_authentication.please')}</H6Font>
        <GoogleLoginButton onAuthenticate={onLoginGoogle} />
        <FacebookLoginButton onAuthenticate={onLoginFacebook} />
      </LoginButtonContainer>
    </>
  );
};

interface StepAuthenticationProps {
  onLoginGoogle: Function;
  onLoginFacebook: Function;
}

export default StepAuthentication;
