import { HeartOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const LocationPopup: React.FC<LocationPopupProps> = ({
  visible,
  closeModal,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      onCancel={closeModal}
      footer={
        <SubmitButton
          type="primary"
          block
          icon={<HeartOutlined />}
          onClick={closeModal}
        >
          {t('i_understand')}
        </SubmitButton>
      }
      style={{ top: '120px' }}
      bodyStyle={{ height: '50vh', textAlign: 'center' }}
    >
      <TitleWithUnderline level={1}>
        {t('modules.create.postLocation.public')}
      </TitleWithUnderline>
      {t('modules.create.postLocation.publicText')}
    </Modal>
  );
};

interface LocationPopupProps {
  visible: boolean;
  closeModal: () => void;
}

export default LocationPopup;

const SubmitButton = styled(Button)`
  background: ${COLORS.stepForwardNormal} !important;
`;
