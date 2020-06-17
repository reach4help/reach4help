import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from 'src/assets/logo.png';
import IntroLogo from 'src/components/IntroLogo/IntroLogo';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import styled from 'styled-components';

import FacebookLoginButton from '../FacebookLoginButton/FacebookLoginButton';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';

const { Title, Text } = Typography;

const Login: React.FC<LoginProps> = ({
  onLoginGoogle,
  onLoginFacebook,
}): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <IntroLogo src={logo} alt="logo" />
      <LoginTitle>{t('login.title')}</LoginTitle>
      <TitleWithAddon level={2}>{t('login.sub_title')}</TitleWithAddon>
      <Info>{t('login.info')}</Info>
      <LoginButtonContainer>
        <GoogleLoginButton onAuthenticate={onLoginGoogle} />
        <FacebookLoginButton onAuthenticate={onLoginFacebook} />
      </LoginButtonContainer>
    </>
  );
};

const LoginTitle = styled(Title)`
  margin-top: 20px;
  margin-bottom: 50px !important;
`;

const Info = styled(Text)`
  margin-top: 40px;
  text-align: center;
`;

const LoginButtonContainer = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  width: 220px;
`;

interface LoginProps {
  onLoginGoogle: Function;
  onLoginFacebook: Function;
}

export default Login;
