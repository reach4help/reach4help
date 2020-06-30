import { Button } from 'antd';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

export const ContinueButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ContinueButton = styled(Button)`
  margin-top: 50px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-around;
`;

export const MailAuthButton = styled(Button)`
  /* gradient_logo */

  background: linear-gradient(172.72deg, #f27979 2.64%, #7d00a3 97.36%);
  /* button */

  margin: 50 0 50;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  white-space: nowrap;
  width: 100%;
  color: white;
  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    /* overrides antd */
    color: linear-gradient(172.72deg, #f27979 2.64%, #7d00a3 97.36%);
    background-color: white;
  }
`;
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

export const SettingsButton = styled(Button)`
  display: flex;
  justify-content: start;
  font-size: 20px
  font-weight: normal;
  padding: 10px;
  width: 100%;
  > span {
      display: flex;
      align-items: center;
      justify-content: space-around;
  }
`;

export const ModalCancelButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ModalContinueButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${COLORS.secondary};
  color: ${COLORS.white};
`;
