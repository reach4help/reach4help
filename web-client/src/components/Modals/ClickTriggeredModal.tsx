import { MailOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StepForwardButton } from 'src/components/Buttons';
import { COLORS } from 'src/theme/colors';

export const TriggeredModal: React.FC<TriggeredModalProps> = ({
  finishRequestHandler,
  title = 'Instructions',
  children,
}) => {
  const { t } = useTranslation();

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
    <Modal onCancel={() => onFinishRequest()} footer={null}>
      <ModalHeader />
      {children}
      <div style={{ display: 'flex' }}>
        <StepForwardButton onClick={onFinishRequest}>
          {t('i_understand')}
          {title}
        </StepForwardButton>
      </div>
      <ModalFooter />
    </Modal>
  );
};

interface TriggeredModalProps {
  title?: string;
  children: any;
  finishRequestHandler?: () => void;
}

export default TriggeredModal;
