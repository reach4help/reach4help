import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
}): React.ReactElement => (
  <GradientBackgroundWrapper>{children}</GradientBackgroundWrapper>
);

const GradientBackgroundWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: ${COLORS.backgroundAlternative};
  background: linear-gradient(
    135deg,
    ${COLORS.backgroundAlternative} 0,
    ${COLORS.link} 100%
  );
`;

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export default GradientBackground;
