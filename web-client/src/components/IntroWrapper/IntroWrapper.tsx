import React from 'react';
import styled from 'styled-components';

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
`;

const IntroWrapper: React.FC<IntroWrapperProps> = ({
  children,
}): React.ReactElement => <IntroContainer>{children}</IntroContainer>;

interface IntroWrapperProps {
  children: React.ReactNode;
}

export default IntroWrapper;
