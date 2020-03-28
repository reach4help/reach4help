import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const { Title } = Typography;

const TitleWrapper = styled.div`
  position: relative;
`;

const StyledTitle = styled(Title)`
  :after {
    content: ' ';
    position: absolute;
    width: 30%;
    height: 6px;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    background-color: ${COLORS.highlight};
  }
`;

const TitleWithAddon: React.FC<TitleWithAddonProps> = ({ children, level }): React.ReactElement => (
  <TitleWrapper>
    <StyledTitle level={level}>
      {children}
    </StyledTitle>
  </TitleWrapper>
);

interface TitleWithAddonProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4;
}

export default TitleWithAddon;
