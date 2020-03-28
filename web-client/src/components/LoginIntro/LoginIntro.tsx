import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import logo from '../../assets/logo.png';
import FacebookLoginButton from '../FacebookLoginButton/FacebookLoginButton';
import TitleWithAddon from '../TitleWithAddon/TitleWithAddon';

const { Title, Text } = Typography;

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
`;

const Logo = styled.img`
  height: 125px;
  width: 125px;
`;

const StyledTitle = styled(Title)`
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
const LoginIntro: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <StyledIntro>
      <Logo src={logo} alt="logo" />
      <StyledTitle>{t('login.title')}</StyledTitle>
      <TitleWithAddon level={2}>{t('login.sub_title')}</TitleWithAddon>
      <Info>{t('login.info')}</Info>
      <FacebookContainer>
        <FacebookLoginButton />
      </FacebookContainer>
    </StyledIntro>
  );
};

export default LoginIntro;
