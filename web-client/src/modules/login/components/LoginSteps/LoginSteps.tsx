import { Button } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Step1 from './Step1SelectLanguage';
import Step3 from './Step3Authentication';
import Step4 from './Step4EmailLogin';

const LoginSteps: React.FC<LoginStepsProps> = ({
  onLoginFacebook,
  onLoginGoogle,
}): React.ReactElement => {
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState<number>(2);
  const incrementStep = () => setCurrentStep(currentStep + 1);

  const steps = [
    {
      title: t('login.steps.1_select_language.title'),
      content: <Step1 />,
    },
    {
      title: t('login.steps.3_authentication.title'),
      content: (
        <Step3
          onLoginFacebook={onLoginFacebook}
          onLoginGoogle={onLoginGoogle}
        />
      ),
    },
    {
      title: t('login.steps.4_email_login.title'),
      content: <Step4 />,
    },
  ];

  return (
    <>
      <div className="steps-content">{steps[currentStep].content}</div>

      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <ContinueButtonWrapper>
            <ContinueButton type="primary" onClick={incrementStep}>
              {t('login.steps.continue')}
            </ContinueButton>
          </ContinueButtonWrapper>
        )}
      </div>
    </>
  );
};
const ContinueButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ContinueButton = styled(Button)`
  margin-top: 50px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-around;
`;
interface LoginStepsProps {
  onLoginGoogle: Function;
  onLoginFacebook: Function;
}

export default LoginSteps;
