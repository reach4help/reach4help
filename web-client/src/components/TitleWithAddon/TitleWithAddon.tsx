/* TODO
this is a very weird file
addOn logic should be eliminated.  
logic for value of left can be directly set with ternary operatory. 
incoming left prop should be renamed "originalLeft" not have same name as HTML attribute
*/
import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const doAddonAlignment = (
  alignAddon: string | undefined,
  left: string | undefined,
) => {
  switch (alignAddon) {
    case 'left':
      return left || '12%';
    case 'right':
      return '88%';
    default:
      return '50%';
  }
};

const TitleWithAddon: React.FC<TitleWithAddonProps> = ({
  children,
  level,
  alignAddon,
  left,
  bottom,
  transform,
}): React.ReactElement => (
  <TitleWrapper>
    {/* 
    There is a bug with styled-components regarding camelCase props. I will not try to workaround,
    and wait until it's fixed 
    https://github.com/styled-components/styled-components/issues/2131 */}
    <TitleWithAddonWrapperTitle
      alignAddon={alignAddon}
      level={level}
      left={left}
      bottom={bottom}
      transform={transform}
    >
      {children}
    </TitleWithAddonWrapperTitle>
  </TitleWrapper>
);

const TitleWrapper = styled.div`
  position: relative;
`;

const TitleWithAddonWrapperTitle = styled(Typography.Title)`
  white-space: pre-line;
  text-align: ${(props: TitleWithAddonProps) => props.left || 'center'};
  :after {
    content: ' ';
    position: absolute;
    width: 40px;
    height: 6px;
    left: ${(props: TitleWithAddonProps) =>
      doAddonAlignment(props.alignAddon, props.left)};
    bottom: ${(props: TitleWithAddonProps) => props.bottom || 0};
    transform: ${(props: TitleWithAddonProps) =>
      props.transform || 'translate(-50%, 0)'};
    background-color: ${COLORS.highlight};
  }
`;

interface TitleWithAddonProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4;
  // REVIEW: I need help defining this type
  alignAddon?: string;
  left?: string;
  bottom?: string;
  transform?: string;
}

export default TitleWithAddon;
