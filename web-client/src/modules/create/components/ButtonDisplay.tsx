import React from 'react';
import styled from 'styled-components';

const ButtonDisplay = ({ children }) => (
  <ButtonDisplayDiv>{children}</ButtonDisplayDiv>
);

const ButtonDisplayDiv = styled.div`
  display: flex;
  position: absolute;
  top: 90%;
`;

export default ButtonDisplay;
