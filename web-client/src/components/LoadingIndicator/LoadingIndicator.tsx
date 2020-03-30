import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';
import styled from 'styled-components';

import animationData from '../../assets/lotties/loading.json';
import { COLORS } from '../../theme/colors';
import TitleWithAddon from '../TitleWithAddon/TitleWithAddon';

const { Title, Text } = Typography;

const Container = styled.div`
  min-height: 100vh;
  flex-direction: column;
  display: flex;
`;

const StyledIntro = styled.div`
  display: flex;
  flex-grow : 5;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
`;

const Footer = styled.div`
  display: flex;
  flex-grow : 1;
  background: rgba(0, 0, 0, 0.05);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
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

const Tip = styled(Text)`
  text-align: center;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.45);
`;

const TipTile = styled(Tip)`
  color: ${COLORS.highlight};
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
    <Container>
      <StyledIntro>
        <TitleWithAddon level={4}>{t('loading.title')}</TitleWithAddon>
        <LottieContainer>
          <Lottie options={defaultOptions} />
        </LottieContainer>
        <StyledTitle level={4}>{t('loading.pleaseWaitLabel')}</StyledTitle>
      </StyledIntro>
      <Footer>
        <TipTile>{t('loading.tip_title')}</TipTile>
        <Tip>{t('loading.tip_info')}</Tip>
      </Footer>
    </Container>
  );
};

export default LoadingIndicator;
