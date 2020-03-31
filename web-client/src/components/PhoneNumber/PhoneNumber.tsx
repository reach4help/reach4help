import { Button, Input, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import logo from '../../assets/logo.png';
import TitleWithAddon from '../TitleWithAddon/TitleWithAddon';

const { Text } = Typography;

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

const Description = styled(Text)`
  margin-top: 3rem;
  text-align: center;
`;

const StyledInput = styled(Input)`
  margin-top: 1rem;
  width: 11rem;
`;

const Info = styled(Text)`
  color: #ddd;
  /* margin-top: 40px; */
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
`;

const PhoneNumber: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <StyledIntro>
      <Logo src={logo} alt="logo" />
      <TitleWithAddon level={4}>{t('welcome')}</TitleWithAddon>
      <Description>{t('phoneNumber.sub_title')}</Description>
      <StyledInput placeholder="+0 000 000 000 000" />
      <Info>{t('phoneNumber.info')}</Info>
      <StyledButton type="primary">{t('continue')}</StyledButton>
    </StyledIntro>
  );
};

export default PhoneNumber;
