import { FileProtectOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StepBackButton, StepForwardButton } from 'src/components/Buttons';
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

const InformationModal = ({ finishRequestHandler, visible }) => {
  const { t } = useTranslation();
  const onFinishRequest = (): void => {
    finishRequestHandler;
    setRequestModalVisible(false);
  };

  const [requestModalVisible, setRequestModalVisible] = useState<boolean>(
    visible,
  );
  return (
    <Modal
      visible={requestModalVisible}
      onCancel={(): void => setRequestModalVisible(false)}
      footer={null}
    >
      <FlexDiv>
        <ModalLogo />
      </FlexDiv>

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
