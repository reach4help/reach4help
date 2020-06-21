import React from 'react';
import styled from 'styled-components';

import FacebookLoginButton from '../FacebookLoginButton/FacebookLoginButton';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';

const StepAuthentication: React.FC<StepAuthenticationProps> = ({
  onLoginGoogle,
  onLoginFacebook,
}): React.ReactElement<StepAuthenticationProps> => (
  <LoginButtonContainer>
    <GoogleLoginButton onAuthenticate={onLoginGoogle} />
    <FacebookLoginButton onAuthenticate={onLoginFacebook} />
  </LoginButtonContainer>
);

const LoginButtonContainer = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  width: 220px;
`;

interface StepAuthenticationProps {
  onLoginGoogle: Function;
  onLoginFacebook: Function;
}

export default StepAuthentication;
