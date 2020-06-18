import { Button } from 'antd';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

export const StepBackButton = styled(Button)`
  border-radius: 4px;
  white-space: nowrap;
  width: 100%;
  background-color: ${COLORS.stepBackwardNormal};
  color: white;
  font-weight: 700;
  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    /* overrides antd */
    color: white;
    background-color: ${COLORS.stepBackwardEnhanced};
  }
`;

export const StepForwardButton = styled(Button)`
  border-radius: 4px;
  white-space: nowrap;
  width: 100%;
  background-color: ${COLORS.stepForwardNormal};
  color: white;
  font-weight: 700;
  border: none;
  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    background-color: ${COLORS.stepForwardEnhanced};

    /* overrides antd purple color */
    color: white;
  }
`;
