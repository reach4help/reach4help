import React from 'react';
import styled from 'styled-components';

const IntroWrapper: React.FC<IntroWrapperProps> = ({
  children,
}): React.ReactElement => (
  <IntroWrapperContainer>{children}</IntroWrapperContainer>
);

const IntroWrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
`;

interface IntroWrapperProps {
  children: React.ReactNode;
}

export default IntroWrapper;
