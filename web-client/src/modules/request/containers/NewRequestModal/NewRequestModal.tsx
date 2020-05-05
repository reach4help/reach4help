import { Modal, Typography } from 'antd';
import React, { useState } from 'react';
import NewRequestIcon from 'src/assets/new-request-icon.svg';
import styled from 'styled-components';

import NewRequestForm from '../../components/NewRequestForm/NewRequestForm';

const { Text } = Typography;

const NewRequestModal: React.FC<NewRequestModalProps> = ({
  showModal,
  closeModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    // TODO if success, then show success modal
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const FormContent = <NewRequestForm handleFormSubmit={handleSubmit} />;
  // TODO use translation
  const LoadingContent = <h3>Submitting wait a second!</h3>;
  const SuccessContent = (
    <>
      <h3>Request Submitted</h3>
      <button type="button" onClick={closeModal}>
        Continue
      </button>
    </>
  );

  return (
    <Modal
      style={{ top: '64px', padding: 0 }}
      visible={showModal}
      onCancel={closeModal}
      footer={null}
    >
      <NewRequestIconImage src={NewRequestIcon} />
      <TextOutlined>
        {/* TODO use translation */}
        <Text>I need help</Text>
      </TextOutlined>
      {loading && LoadingContent}
      {!loading && success && SuccessContent}
      {!loading && !success && FormContent}
    </Modal>
  );
};

const TextOutlined = styled.div`
  position: relative;
  top: -36px;
  text-align: center;

  span {
    color: #ff7b02;
    border: 1px solid #ff7b02;
    background: rgba(255, 123, 2, 0.1);
    padding: 5px;
  }
`;

const NewRequestIconImage = styled.img`
  display: block;
  position: relative;
  top: -46px;
  height: 100px;
  margin: 0 auto;
`;

interface NewRequestModalProps {
  showModal: boolean;
  closeModal: () => void;
}

export default NewRequestModal;
