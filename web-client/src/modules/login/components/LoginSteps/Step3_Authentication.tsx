import React from 'react';
import { Typography } from 'antd';
import FacebookLoginButton from '../FacebookLoginButton/FacebookLoginButton';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';
import styled from 'styled-components';

const { Title } = Typography;

const StepAuthentication: React.FC<StepAuthenticationProps> = ({
  onLoginGoogle,
  onLoginFacebook,
}): React.ReactElement<StepAuthenticationProps> => (
  <LoginButtonContainer>
    <GoogleLoginButton onAuthenticate={onLoginGoogle} />
    <FacebookLoginButton onAuthenticate={onLoginFacebook} />
  </LoginButtonContainer>
);

const LoginTitle = styled(Title)`
  margin-top: 20px;
  margin-bottom: 50px !important;
`;

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
