import { MailOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StepForwardButton } from 'src/components/Buttons';
import { COLORS } from 'src/theme/colors';

export const TriggeredModal: React.FC<TriggeredModalProps> = ({
  finishRequestHandler,
  children,
  visible = false,
}) => {
  const { t } = useTranslation();

  const handleOKClose = (): void => {
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
    <Modal
      title={null}
      visible={visible}
      onOk={() => handleOKClose()}
      onCancel={() => handleOKClose()}
      footer={ModalFooter}
    >
      {children}
      <div style={{ display: 'flex' }}>
        <StepForwardButton onClick={handleOKClose}>
          {t('i_understand')}
        </StepForwardButton>
      </div>
    </Modal>
  );
};

interface TriggeredModalProps {
  children?: any;
  visible?: boolean;
  finishRequestHandler?: () => void;
}

export default TriggeredModal;
