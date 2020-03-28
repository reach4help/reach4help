import { Card } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 70vw;
  height: 70vh;
  overflow-y: scroll;
`;

const CenteredCard: React.FC<CenteredScreenProps> = ({ children }): React.ReactElement => (
  <StyledCard>
    {children}
  </StyledCard>
);

interface CenteredScreenProps {
  children: React.ReactNode;
}

export default CenteredCard;
