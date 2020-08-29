import { Button } from 'antd';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

export const ContinueButtonWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 30px;

  display: flex;
  justify-content: space-around;
`;

export const ContinueButton = styled(Button)`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const MailAuthButton = styled(Button)`
  /* gradient_logo */

  margin-bottom: 25px;
  background: linear-gradient(172.72deg, #f27979 2.64%, #7d00a3 97.36%);
  /* button */

  border-color: transparent;
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
  max-width: 110px;
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
  min-width: 100%;
  max-width: 180px;
  background-color: ${COLORS.stepForwardNormal};
  color: white;
  font-weight: 700;
  border: none;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    background-color: ${COLORS.stepForwardEnhanced};

    /* overrides antd purple color */
    color: white;
  }
`;

export const SettingsListButton = styled(Button)`
  display: flex;
  justify-content: start;
  font-weight: normal;
  padding: 22px 10px;
  border: none;
  width: 100%;
  color: ${COLORS.black};
  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    color: ${COLORS.black};
  }
  > span {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

export const MediumCancelButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const MediumSaveButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${COLORS.secondary};
  color: ${COLORS.white};
`;
