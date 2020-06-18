import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from 'src/assets/logo.png';
import IntroLogo from 'src/components/IntroLogo/IntroLogo';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import styled from 'styled-components';

import FacebookLoginButton from '../FacebookLoginButton/FacebookLoginButton';

const { Title, Text } = Typography;

const Login: React.FC<LoginProps> = ({
  onLoginFacebook,
}): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <IntroLogo src={logo} alt="logo" />
      <LoginTitle>{t('login.title')}</LoginTitle>
      <TitleWithAddon level={2}>{t('login.sub_title')}</TitleWithAddon>
      <Info>{t('login.info')}</Info>
      <FacebookContainer>
        <FacebookLoginButton onAuthenticate={onLoginFacebook} />
      </FacebookContainer>
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

const FacebookContainer = styled.div`
  padding-top: 80px;
`;

interface LoginProps {
  onLoginFacebook: Function;
}

export default Login;
