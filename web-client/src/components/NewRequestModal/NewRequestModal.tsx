import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import NewRequestIcon from 'src/assets/new-request-icon.svg';
import styled from 'styled-components';

import NewRequestFormContainer from '../../modules/request/containers/NewRequestFormContainer/NewRequestFormContainer';
import CenteredCard from '../CenteredCard/CenteredCard';

const NewRequestModal: React.FC<NewRequestModalProps> = ({ closeModal }) => (
  <Overlay>
    <CenteredCard>
      <NewRequestIconImage src={NewRequestIcon} />
      <CloseButton onClick={closeModal}>
        <CloseOutlined />
      </CloseButton>
      <NewRequestFormContainer />
    </CenteredCard>
  </Overlay>
);

const NewRequestIconImage = styled.img`
  position: relative;
  top: -44px;
  margin: 0 auto;
  display: block;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px;
  background: inherit;
  border: none;
  outline: none;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  padding: 68px 15px 42px 15px;
  background-color: rgba(0, 0, 0, 0.6);
`;

interface NewRequestModalProps {
  closeModal: () => void;
}

export default NewRequestModal;
