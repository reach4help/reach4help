import { Alert } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import logo from '../../assets/logo.png';
import CenteredCard from '../CenteredCard/CenteredCard';
import GradientBackground from '../GradientBackground/GradientBackground';
import TitleWithAddon from '../TitleWithAddon/TitleWithAddon';

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

interface Props {
  loading: boolean;
  errorMessage?: string | null;
}

const PhoneNumberWrapper: React.FC<Props> = ({
  errorMessage,
  children,
}): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <>
      <GradientBackground>
        <CenteredCard>
          {errorMessage && errorMessage !== '' ? (
            <Alert message={errorMessage} type="error" />
          ) : null}
          <StyledIntro>
            <Logo src={logo} alt="logo" />
            <TitleWithAddon level={4}>{t('welcome')}</TitleWithAddon>
            {children}
          </StyledIntro>
        </CenteredCard>
      </GradientBackground>
    </>
  );
};

PhoneNumberWrapper.propTypes = {};

export default PhoneNumberWrapper;
