import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const TitleWithOrangeUnderline: React.FC<TitleWithAddonProps> = ({
  children,
  level,
  orangealignment,
  left,
  bottom,
  transform,
  color,
}): React.ReactElement => (
  <TitleWithOrangeUnderlineOuterDiv>
    <TitleWithOrangeUnderlineInnerDiv
      orangealignment={orangealignment}
      level={level}
      left={left}
      bottom={bottom}
      transform={transform}
      color={color}
    >
      {children}
    </TitleWithOrangeUnderlineInnerDiv>
  </TitleWithOrangeUnderlineOuterDiv>
);

const TitleWithOrangeUnderlineOuterDiv = styled.div`
  position: relative;
`;

const TitleWithOrangeUnderlineInnerDiv = styled(Typography.Title)`
  white-space: pre-line;
  text-align: ${(props: TitleWithAddonProps) => props.left || 'center'};
  :after {
    content: ' ';
    position: absolute;
    width: 40px;
    height: 6px;
    left: ${(props: TitleWithAddonProps) => {
      switch (props.orangealignment) {
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
  orangealignment?: string;
  left?: string;
  bottom?: string;
  transform?: string;
  color?: string;
}

export default TitleWithOrangeUnderline;
