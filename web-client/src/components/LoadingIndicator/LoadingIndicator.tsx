import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';
import styled from 'styled-components';

import animationData from '../../assets/lotties/loading.json';
import TitleWithAddon from '../TitleWithAddon/TitleWithAddon';

const { Title, Text } = Typography;

const StyledIntro = styled.div`
  display: flex;
  background-color: green;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 50px;
`;

const LottieContainer = styled.div`
  min-width: 150px;
  max-width: 360px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  margin: 40px;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 50px !important;
`;

const Info = styled(Text)`
  margin-top: 40px;
  text-align: center;
`;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const LoadingIndicator: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <StyledIntro>
      <TitleWithAddon level={4}>{t('loading.title')}</TitleWithAddon>
      <LottieContainer>
        <Lottie options={defaultOptions} />
      </LottieContainer>
      <StyledTitle level={4}>{t('loading.pleaseWaitLabel')}</StyledTitle>
      <Info>{t('login.info')}</Info>
    </StyledIntro>
  );
};

export default LoadingIndicator;
