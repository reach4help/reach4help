import { Button } from 'antd';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

export const StepBackButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    background-color: ${COLORS.backgroundAlternative};
    color: white;
    font-weight: 700;
  }
`;

export const StepForwardButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${COLORS.secondary};
  color: white;
  &:hover {
    color: ${COLORS.secondaryHover};
    background-color: ${COLORS.white};
    font-weight: 700;
  }
`;
