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

const LoginButtonContainer = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  width: 220px;
  margin-bottom: 25px;
`;

export { Explanation, LoginButtonContainer, LogoWrapper, StepWrapper };
