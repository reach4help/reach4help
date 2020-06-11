import { FileProtectOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StepForwardButton } from 'src/components/Buttons';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const FlexDiv = styled.div`
  display: flex;
`;

const ModalLogo = styled(FileProtectOutlined)`
  color: ${COLORS.success};
  padding-right: 24px;
  font-size: 20px;
`;

export const InformationModal: React.FC<InformationModalProps> = ({
  finishRequestHandler,
  visible = false,
  children,
}) => {
  const { t } = useTranslation();

  const [requestModalVisible, setRequestModalVisible] = useState<boolean>(
    visible,
  );

  const onFinishRequest = (): void => {
    finishRequestHandler && finishRequestHandler();
    setRequestModalVisible(false);
  };

  return (
    <Modal
      visible={requestModalVisible}
      onCancel={(): void => setRequestModalVisible(false)}
      footer={null}
    >
      <FlexDiv>
        <ModalLogo />
      </FlexDiv>
      {children}
      <div>
        <StepForwardButton
          onClick={onFinishRequest}
          icon={<FileProtectOutlined />}
        >
          {t('timeline.finishRequest')}
        </StepForwardButton>
      </div>
    </Modal>
  );
};

interface InformationModalProps {
  visible?: boolean;
  children?: any;
  finishRequestHandler?: () => void;
}
