import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import stayAtHomeLottieJson from 'src/assets/lotties/stay-at-home.json';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import styled from 'styled-components';

import { DEVICE_MAX } from '../../../../constants/mediaQueries';
import { COLORS } from '../../../../theme/colors';

const { Text } = Typography;

const MainDiv = styled.div`
  display: flex;
  @media ${DEVICE_MAX.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

const Footer = styled.div`
  background-color: ${COLORS.grey};
  padding: 1em 1em;
  text-align: center;
  margin: 0 -24px -24px;
`;

const OrangeP = styled(Text)`
  color: ${COLORS.highlight};
`;

const SubtitleP = styled(Text)`
  font-size: 1.1em;
  font-weight: 600;
  text-align: center;
`;

const RememberInfoP = styled.p`
  margin-top: 0.5em;
`;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NewRequestSuccessProps {}

const NewRequest: React.FC<NewRequestSuccessProps> = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <MainDiv>
      <TitleWithAddon level={1}>{t('newRequestSuccess.title')}</TitleWithAddon>
      <SubtitleP>{t('newRequestSuccess.info')}</SubtitleP>
      <LoadingIndicator lottieJson={stayAtHomeLottieJson} />
      <Footer>
        <OrangeP>{t('newRequestSuccess.remember')}</OrangeP>
        <RememberInfoP>{t('newRequestSuccess.remember_info')}</RememberInfoP>
      </Footer>
    </MainDiv>
  );
};

export default NewRequest;
