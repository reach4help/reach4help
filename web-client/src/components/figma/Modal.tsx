import { Modal } from 'antd';
import React from 'react';

export const GenericFigmaModal: React.FC<GenericFigmaModalProps> = ({
  // children is a ReactProp which is the children of the element that calls this component
  children,
  ...modalProps
}) => (
  <Modal
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
