import { Modal, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import stayAtHomeLottieJson from 'src/assets/lotties/stay-at-home.json';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const { Text } = Typography;

const RequestConfirmation: React.FC<RequestConfirmationProps> = ({
  showModal,
  closeModal,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      style={{ top: '64px', padding: 0 }}
      visible={showModal}
      onCancel={closeModal}
      footer={null}
    >
      <>
        <TitleWithUnderline level={1}>
          {t('newRequestSuccess.title')}
        </TitleWithUnderline>
        <SubtitleP>{t('newRequestSuccess.info')}</SubtitleP>
        <LoadingIndicator lottieJson={stayAtHomeLottieJson} />
        <Footer>
          <OrangeP>{t('newRequestSuccess.remember')}</OrangeP>
          <RememberInfoP>{t('newRequestSuccess.remember_info')}</RememberInfoP>
        </Footer>
      </>
    </Modal>
  );
};

const Footer = styled.div`
  background-color: ${COLORS.backgroundLightOrange};
  padding: 1em 1em;
  text-align: center;
  margin: 0 -24px -24px;
`;

const OrangeP = styled(Text)`
  color: ${COLORS.highlight};
`;

const SubtitleP = styled.div`
  font-size: 1.1em;
  font-weight: 600;
  text-align: center;
  margin-top: 28px;
`;

const RememberInfoP = styled.p`
  margin-top: 0.5em;
`;

interface RequestConfirmationProps {
  showModal: boolean;
  closeModal: () => void;
}

export default RequestConfirmation;
