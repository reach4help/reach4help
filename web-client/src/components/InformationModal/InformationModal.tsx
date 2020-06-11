import { FileProtectOutlined } from '@ant-design/icons';
import { List, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import r4hLOVE from 'src/assets/r4hLOVE.png';
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

const R4HloveListItem = styled(List.Item)`
  display: flex;
`;

export const InformationModal: React.FC<InformationModalProps> = ({
  finishRequestHandler,
  visible = false,
  instructions,
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

      <List
        header={<div>{t('information_modal.instructions')}</div>}
        footer={<div>{t('information_modal.footer')}</div>}
        bordered
        dataSource={instructions}
        renderItem={item => (
          <R4HloveListItem>
            <img
              alt={t('information_modal.a11y_logo')}
              height="18px"
              width="18px"
              src={r4hLOVE}
            />{' '}
            <Typography.Text>{item}</Typography.Text>
          </R4HloveListItem>
        )}
      />

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
  instructions?: string[];
  finishRequestHandler?: () => void;
}
