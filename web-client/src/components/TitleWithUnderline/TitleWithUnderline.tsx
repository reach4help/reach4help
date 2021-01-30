import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const TitleWithUnderline: React.FC<TitleWithUnderlineProps> = ({
  children,
  level,
  color = COLORS.highlight,
}): React.ReactElement => (
  <TitleWithUnderlineOuterDiv>
    <Title level={level}>{children}</Title>
    <Underline color={color} />
  </TitleWithUnderlineOuterDiv>
);

const TitleWithUnderlineOuterDiv = styled.div`
  position: relative;
`;

const Title = styled(Typography.Title)`
  white-space: pre-line;
  text-align: center;
  margin-bottom: 0 !important;
`;

const Underline = styled.hr`
  width: 40px;
  height: 6px;
  border: none;
  background-color: ${props => props.color};
  margin-bottom: 15px;
  margin-top: 10px;
`;

interface TitleWithUnderlineProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4;
  color?: string;
}

export default TitleWithUnderline;
