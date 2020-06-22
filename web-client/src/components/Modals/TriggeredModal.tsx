import { MailOutlined } from '@ant-design/icons';
import { List, Modal, Typography } from 'antd';
import React, { Children, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import r4hLOVE from '../../assets/r4hLOVE.png';
import { StepForwardButton } from 'src/components/Buttons';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

export const TriggeredModal: React.FC<TriggeredModalProps> = ({
  finishRequestHandler,
  title = 'Instructions',
  children,
}) => {
  const { t } = useTranslation();

  const [requestModalVisible, setRequestModalVisible] = useState<boolean>(
    false,
  );

  const onFinishRequest = (): void => {
    finishRequestHandler && finishRequestHandler();
  };

  const ModalHeader = header => <h2>{header}</h2>;

  const ModalFooter = () => (
    <div>
      <a href="mailto:support@reach4help.org">
        <em
          style={{
            color: COLORS.lightBlue,
          }}
        >
          {t('Triggered_modal.footer')}
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
    <Modal visible={requestModalVisible} footer={null}>
      {children}
      <div style={{ display: 'flex' }}>
        <StepForwardButton onClick={onFinishRequest}>
          {t('i_understand')}
        </StepForwardButton>
      </div>
    </Modal>
  );
};

const R4HloveListItem = styled(List.Item)`
  display: flex;
`;

interface TriggeredModalProps {
  title?: string;
  children: any;
  finishRequestHandler?: () => void;
}

export default TriggeredModal;
