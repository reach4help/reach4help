import { FileProtectOutlined, MailOutlined } from '@ant-design/icons';
import { List, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import r4hLOVE from 'src/assets/r4hLOVE.png';
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

const R4HloveListItem = styled(List.Item)`
  display: flex;
`;

export const InformationModal: React.FC<InformationModalProps> = ({
  finishRequestHandler,
  visible = false,
  title = 'Instructions',
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
  const ModalFooter = () => (
    <div>
      <a href="mailto:info@reach4help.org">
        <em
          style={{
            color: COLORS.lightBlue,
          }}
        >
          {t('information_modal.footer')}
        </em>
        &nbsp;&nbsp;&nbsp;
        <MailOutlined
          style={{
            color: COLORS.lightBlue,
          }}
        />
      </a>
    </div>
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

      <List
        header={<div>{title}</div>}
        footer={ModalFooter()}
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

      <div style={{ display: 'flex' }}>
        <StepBackButton
          onClick={() => setRequestModalVisible(false)}
          icon={<FileProtectOutlined />}
        >
          {t('cancel')}
        </StepBackButton>
        <StepForwardButton
          onClick={onFinishRequest}
          icon={<FileProtectOutlined />}
        >
          {t('okay')}
        </StepForwardButton>
      </div>
    </Modal>
  );
};

interface InformationModalProps {
  title?: boolean;
  visible?: boolean;
  instructions?: string[];
  finishRequestHandler?: () => void;
}
