import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const Background = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background: ${COLORS.backgroundAlternative};
  background: linear-gradient(125.44deg, ${COLORS.backgroundAlternative} 0.39%, ${COLORS.link} 124.45%);
`;

const GradientBackground: React.FC<WrapperProps> = ({ children }): React.ReactElement => (
  <Background>
    {children}
  </Background>
);

interface WrapperProps {
  children: React.ReactNode;
}

export default GradientBackground;
