import React from 'react';
import LoadingLogo from 'src/assets/loadinglogo.svg';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoadingWrapper: React.FC<WrapperProps> = ({
  children,
}): React.ReactElement => (
  <Container>
    <img src={LoadingLogo} alt="loading..." />
    {children}
  </Container>
);

interface WrapperProps {
  children?: React.ReactNode;
}

export default LoadingWrapper;
