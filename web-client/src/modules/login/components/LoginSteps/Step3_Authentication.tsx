import { Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

/* import AuthenticationExplanationModal from 'src/components/TriggeredModal/TriggeredModal'; */
import FacebookLoginButton from '../FacebookLoginButton/FacebookLoginButton';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';

const StepAuthentication: React.FC<StepAuthenticationProps> = ({
  onLoginGoogle,
  onLoginFacebook,
}): React.ReactElement<StepAuthenticationProps> => {
  const [showExplanationModal, setShowExplanationModal] = useState<boolean>(
    false,
  );

  return (
    <>
      <LoginButtonContainer>
        <H6>Please sign up with one of our providers below</H6>
        <ModalTrigger onClick={() => setShowExplanationModal(true)}>
          <H4>Why do you need an external account?</H4>
        </ModalTrigger>

        <GoogleLoginButton onAuthenticate={onLoginGoogle} />
        <FacebookLoginButton onAuthenticate={onLoginFacebook} />
      </LoginButtonContainer>
      {showExplanationModal && <div>Hello World</div>}
    </>
  );
};

const ModalTrigger = styled(Button)`
  width: 90%;
  border: 1px solid #250031;
  box-sizing: border-box;
  padding: 5px;
  /* card */

  margin: 33px auto 33px auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
`;

const H6 = styled.span`
  /* h6 */

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 144%;

  text-align: center;

  /* @heading-color */

  color: rgba(0, 0, 0, 0.85);
`;

const H4 = styled.span`
  /* H4 */

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  /* or 157% */

  text-align: center;

  /* @heading-color */

  color: rgba(0, 0, 0, 0.85);
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
