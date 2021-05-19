import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StepForwardButton } from 'src/components/Buttons';

export const TriggeredModal: React.FC<TriggeredModalProps> = ({
  finishRequestHandler,
  children,
  visible = false,
}) => {
  const { t } = useTranslation();

  const handleOKClose = (): void => {
    finishRequestHandler && finishRequestHandler();
  };

  return (
    <Modal
      title={null}
      visible={visible}
      onOk={() => handleOKClose()}
      onCancel={() => handleOKClose()}
      footer={null}
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
