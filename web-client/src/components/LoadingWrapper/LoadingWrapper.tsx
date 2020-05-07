import { Spin } from 'antd';
import React from 'react';
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
    <Spin size="large">{children}</Spin>
  </Container>
);

interface WrapperProps {
  children?: React.ReactNode;
}

export default LoadingWrapper;
