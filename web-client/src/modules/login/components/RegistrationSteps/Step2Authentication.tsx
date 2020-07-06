import { MailOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logoSmall from 'src/assets/logoSmall.png';
import { MailAuthButton } from 'src/components/Buttons';
import {
  ButtonWrapper,
  Explanation,
  H6Font,
  LoginButtonsWrapper,
  LogoWrapper,
  OrDivider,
  StepWrapper,
} from 'src/components/figma/';

import FacebookLoginButton from '../FacebookLoginButton/FacebookLoginButton';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';

const StepAuthentication: React.FC<StepAuthenticationProps> = ({
  onLoginGoogle,
  onLoginFacebook,
  goToSignIn,
}): React.ReactElement<StepAuthenticationProps> => {
  const { t } = useTranslation();

  return (
    <StepWrapper>
      <LogoWrapper>
        <img src={logoSmall} alt="logo" height="70px" width="70px" />
      </LogoWrapper>
      <Explanation>
        <H6Font>{t('login.steps.2_authentication.please')}</H6Font>
      </Explanation>
      <LoginButtonsWrapper>
        <ButtonWrapper style={{ width: '100%' }}>
          <GoogleLoginButton onAuthenticate={onLoginGoogle} />
        </ButtonWrapper>
        <ButtonWrapper style={{ width: '100%' }}>
          <FacebookLoginButton onAuthenticate={onLoginFacebook} />
        </ButtonWrapper>
      </LoginButtonsWrapper>
      <OrDivider />
      <ButtonWrapper style={{ width: '100%' }}>
        <MailAuthButton onClick={() => goToSignIn()} size="large">
          <MailOutlined />
          {t('login.steps.2_authentication.email_signin')}
        </MailAuthButton>
      </ButtonWrapper>
    </StepWrapper>
  );
};

interface StepAuthenticationProps {
  onLoginGoogle: Function;
  onLoginFacebook: Function;
  goToSignUp: Function;
  goToSignIn: Function;
}

export default StepAuthentication;
