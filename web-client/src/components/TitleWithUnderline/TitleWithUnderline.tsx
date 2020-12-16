import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const TitleWithUnderline: React.FC<TitleWithAddonProps> = ({
  children,
  level,
  alignment,
  left,
  bottom,
  transform,
  color,
}): React.ReactElement => (
  <TitleWithUnderlineOuterDiv>
    <TitleWithUnderlineInnerDiv
      alignment={alignment}
      level={level}
      left={left}
      bottom={bottom}
      transform={transform}
      color={color}
    >
      {children}
    </TitleWithUnderlineInnerDiv>
  </TitleWithUnderlineOuterDiv>
);

const TitleWithUnderlineOuterDiv = styled.div`
  position: relative;
`;

const TitleWithUnderlineInnerDiv = styled(Typography.Title)`
  white-space: pre-line;
  text-align: ${(props: TitleWithAddonProps) => props.left || 'center'};
  :after {
    content: ' ';
    position: absolute;
    width: 40px;
    height: 6px;
    left: ${(props: TitleWithAddonProps) => {
      switch (props.alignment) {
        case 'left':
          return props.left || '12%';
        case 'right':
          return '88%';
        case 'center':
          return '50%';
        default:
          return '50%';
      }
    }};
    bottom: ${(props: TitleWithAddonProps) => props.bottom || 0};
    transform: ${(props: TitleWithAddonProps) =>
      props.transform || 'translate(-50%, 0)'};
    background-color: ${props => props.color || COLORS.highlight};
  }
`;

interface TitleWithAddonProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4;
  // REVIEW: I need help defining this type
  alignment?: string;
  left?: string;
  bottom?: string;
  transform?: string;
  color?: string;
}

export default TitleWithUnderline;
