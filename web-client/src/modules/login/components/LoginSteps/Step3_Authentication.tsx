import React from 'react';
import { useTranslation } from 'react-i18next';
import logoSmall from 'src/assets/logoSmall.png';
import {
  ButtonWrapper,
  Explanation,
  H6Font,
  LoginButtonsWrapper,
  LogoWrapper,
  OrDivider,
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
        <img src={logoSmall} alt="logo" height="50px" width="50px" />
      </LogoWrapper>
      <Explanation>
        <H6Font>{t('login.steps.3_authentication.please')}</H6Font>
      </Explanation>
      <LoginButtonsWrapper>
        <ButtonWrapper>
          <GoogleLoginButton onAuthenticate={onLoginGoogle} />
        </ButtonWrapper>
        <ButtonWrapper>
          <FacebookLoginButton onAuthenticate={onLoginFacebook} />
        </ButtonWrapper>
      </LoginButtonsWrapper>
      <OrDivider />
    </>
  );
};

interface StepAuthenticationProps {
  onLoginGoogle: Function;
  onLoginFacebook: Function;
}

export default StepAuthentication;
