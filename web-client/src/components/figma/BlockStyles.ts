/* Common layout patterns used by Figma */

import styled from 'styled-components';

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StepWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

const Explanation = styled('div')`
  margin-bottom: 50px;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  text-align: center;
`;

const LoginButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
  margin-bottom: 25px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export {
  ButtonWrapper,
  Explanation,
  LoginButtonsWrapper,
  LogoWrapper,
  StepWrapper,
};
