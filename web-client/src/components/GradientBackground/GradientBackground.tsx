import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const Background = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: ${COLORS.backgroundAlternative};
  background: linear-gradient(
    125.44deg,
    ${COLORS.backgroundAlternative} 0.39%,
    ${COLORS.link} 124.45%
  );
`;

const GradientBackground: React.FC<WrapperProps> = ({
  children,
}): React.ReactElement => <Background>{children}</Background>;

interface WrapperProps {
  children: React.ReactNode;
}

export default GradientBackground;
