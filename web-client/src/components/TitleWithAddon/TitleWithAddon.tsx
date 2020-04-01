import { Typography } from "antd";
import React from "react";
import styled from "styled-components";

import { COLORS } from "../../theme/colors";

const { Title } = Typography;

const TitleWrapper = styled.div`
  position: relative;
`;

const doAddonAlignment = (align: string | undefined) => {
  switch (align) {
    case "left":
      return "12%";
    case "right":
      return "88%";
    default:
      return "50%";
  }
};

const StyledTitle = styled(Title)`
  white-space: pre-line;
  text-align: center;
  :after {
    content: " ";
    position: absolute;
    width: 40px;
    height: 6px;
    left: ${(props: TitleWithAddonProps) => doAddonAlignment(props.alignAddon)};
    bottom: 0;
    transform: translate(-50%, 0);
    background-color: ${COLORS.highlight};
  }
`;

const TitleWithAddon: React.FC<TitleWithAddonProps> = ({
  children,
  level,
  alignAddon
}): React.ReactElement => (
  <TitleWrapper>
    {/* 
    There is a bug with styled-components regarding camelCase props. I will not try to workaround,
    and wait until it's fixed 
    https://github.com/styled-components/styled-components/issues/2131 */}
    <StyledTitle alignAddon={alignAddon} level={level}>
      {children}
    </StyledTitle>
  </TitleWrapper>
);

interface TitleWithAddonProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4;
  // REVIEW: I need help defining this type
  alignAddon?: string;
}

export default TitleWithAddon;
