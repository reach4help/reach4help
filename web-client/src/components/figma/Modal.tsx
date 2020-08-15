import { Modal } from 'antd';
import React from 'react';

export const GenericFigmaModal: React.FC<GenericFigmaModalProps> = ({
  children,
  ...modalProps
}) => (
  <Modal
  centered
    {...modalProps}
    // style this further to meet any standards specified in Figma and use this instead of the antd Modal
  >
    {children}
  </Modal>
);

interface GenericFigmaModalProps {
  children?: any;
  visible: boolean;
  footer: any;
  closable: boolean;
  title: string | null;
}

export default GenericFigmaModal;
