import { Button } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EventTriggeredModal from 'src/components/Modals/EventTriggeredModal';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import CONSTANTS from 'src/constants';
import styled from 'styled-components';

import FacebookLoginButton from '../FacebookLoginButton/FacebookLoginButton';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';

const { SUPPORT_EMAIL } = CONSTANTS;

const StepAuthentication: React.FC<StepAuthenticationProps> = ({
  onLoginGoogle,
  onLoginFacebook,
}): React.ReactElement<StepAuthenticationProps> => {
  const { t } = useTranslation();

  const [showExplanationModal, setShowExplanationModal] = useState<boolean>(
    false,
  );
  const AuthenticationExplanationModal = () => (
    <EventTriggeredModal
      visible
      finishRequestHandler={() => setShowExplanationModal(false)}
    >
      <MainQuestion>
        <TitleWithAddon level={2} alignAddon="50%">
          {t('login.steps.3_authentication.popup_explanation.main_question')}
        </TitleWithAddon>
      </MainQuestion>
      <MainAnswer>
        <H6>
          {t('login.steps.3_authentication.popup_explanation.main_answer')}
        </H6>
      </MainAnswer>
      <SecondQuestion>
        {t('login.steps.3_authentication.popup_explanation.second_question')}
      </SecondQuestion>
      <SecondAnswer>
        <H6>
          {t('login.steps.3_authentication.popup_explanation.second_answer')}{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}> {SUPPORT_EMAIL} </a>
        </H6>
      </SecondAnswer>
    </EventTriggeredModal>
  );

  return (
    <>
      <LoginButtonContainer>
        <H6>{t('login.steps.3_authentication.please')}</H6>
        <ModalTrigger onClick={() => setShowExplanationModal(true)}>
          <H4>
            {t('login.steps.3_authentication.popup_explanation.main_question')}
          </H4>
        </ModalTrigger>
        <GoogleLoginButton onAuthenticate={onLoginGoogle} />
        <FacebookLoginButton onAuthenticate={onLoginFacebook} />
      </LoginButtonContainer>
      {showExplanationModal && <AuthenticationExplanationModal />}
    </>
  );
};

const ModalTrigger = styled(Button)`
  text-align: center;
  border: 1px solid #250031;
  box-sizing: border-box;
  /* card */

  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 3px;

  /* TODO This is a hack */
  width: 300px;
  height: 50px;
  margin: 33px auto 33px auto;
`;

const MainQuestion = styled.div`
  text-align: center;
  margin-bottom: 25px;
  margin-top: 10px;
`;
const MainAnswer = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SecondQuestion = styled.div`
  /* H4 */
  text-align: center;
  margin-bottom: 25px;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  /* or 144% */

  text-align: center;

  /* @heading-color */

  color: rgba(0, 0, 0, 0.85);
`;

const SecondAnswer = styled.div`
  text-align: center;
  margin-bottom: 120px;
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
  margin-bottom: 25px;
`;

interface StepAuthenticationProps {
  onLoginGoogle: Function;
  onLoginFacebook: Function;
}

export default StepAuthentication;
