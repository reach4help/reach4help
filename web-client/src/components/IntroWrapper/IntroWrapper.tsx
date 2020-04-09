import React from 'react';
import styled from 'styled-components';

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
`;

const IntroWrapper: React.FC<WrapperProps> = ({
  children,
}): React.ReactElement => <StyledIntro>{children}</StyledIntro>;

interface WrapperProps {
  children: React.ReactNode;
}

export default IntroWrapper;
