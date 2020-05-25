import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const { Title } = Typography;

const TitleWrapper = styled.div`
  position: relative;
`;

const doAddonAlignment = (alignAddon: string | undefined, align: string | undefined) => {
  switch (alignAddon) {
    case 'left':
      return align ? '3%' : '12%';
    case 'right':
      return '88%';
    default:
      return '50%';
  }
};

const StyledTitle = styled(Title)`
  white-space: pre-line;
  text-align: ${(props: TitleWithAddonProps) => props.align || 'center'};
  :after {
    content: ' ';
    position: absolute;
    width: 40px;
    height: 6px;
    left: ${(props: TitleWithAddonProps) => doAddonAlignment(props.alignAddon, props.align)};
    bottom: ${(props: TitleWithAddonProps) => props.addonBottom || 0};
    transform: translate(-50%, 0);
    background-color: ${COLORS.highlight};
  }
`;

const TitleWithAddon: React.FC<TitleWithAddonProps> = ({
  children,
  level,
  alignAddon,
  align,
  addonBottom,
}): React.ReactElement => (
  <TitleWrapper>
    {/* 
    There is a bug with styled-components regarding camelCase props. I will not try to workaround,
    and wait until it's fixed 
    https://github.com/styled-components/styled-components/issues/2131 */}
    <StyledTitle alignAddon={alignAddon} level={level} align={align} addonBottom={addonBottom}>
      {children}
    </StyledTitle>
  </TitleWrapper>
);

interface TitleWithAddonProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4;
  // REVIEW: I need help defining this type
  alignAddon?: string;
  align?: string;
  addonBottom?: string;
}

export default TitleWithAddon;
