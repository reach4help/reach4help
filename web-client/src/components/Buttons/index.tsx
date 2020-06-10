import { Button } from 'antd';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

export const StepBackButton = styled(Button)`
  border-radius: 4px;
  white-space: nowrap;
  width: 100%;
  color: ${COLORS.backgroundAlternative};
  background-color: white;
  border: 3px solid ${COLORS.backgroundAlternative};
  font-weight: 700;
  &:hover {
    color: white;
    background-color: ${COLORS.backgroundAlternative};
  }
`;

export const StepForwardButton = styled(Button)`
  border-radius: 4px;
  white-space: nowrap;
  color: white;
  width: 100%;
  background-color: ${COLORS.secondary};
  font-weight: 700;
  border: none;
  &:hover {
    color: ${COLORS.secondary};
    background-color: white;
    border: 3px solid ${COLORS.secondary};
  }
`;
