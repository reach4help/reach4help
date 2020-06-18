import React from 'react';
import styled from 'styled-components';

const IntroComponent: React.FC<IntroComponentProps> = ({
  children,
}): React.ReactElement => <IntroWrapper>{children}</IntroWrapper>;

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
`;

interface IntroComponentProps {
  children: React.ReactNode;
}

export default IntroComponent;
