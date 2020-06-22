import { Button, Steps } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Step0 from './Step0_Welcome';
import Step1 from './Step1_SelectLanguage';
import Step2 from './Step2_Explanation';
import Step3 from './Step3_Authentication';

const { Step } = Steps;

const LoginSteps: React.FC<LoginStepsProps> = ({
  onLoginFacebook,
  onLoginGoogle,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<number>(3);
  const incrementStep = () => setCurrentStep(currentStep + 1);

  const steps = [
    {
      title: t('login.steps.0_welcome.title'),
      content: <Step0 />,
    },
    {
      title: t('login.steps.1_select_language.title'),
      content: <Step1 />,
    },
    {
      title: t('login.steps.2_explanation.title'),
      content: <Step2 />,
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
        <Steps current={currentStep}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
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
