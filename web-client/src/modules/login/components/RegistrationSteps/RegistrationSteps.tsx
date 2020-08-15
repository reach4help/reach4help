import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Step1 from './Step2Authentication';
import Step2 from './Step3EmailSignIn';
import Step3 from './Step4EmailRegistration';

const RegistrationSteps: React.FC<RegistrationStepsProps> = ({
  currentStep,
  setCurrentStep,
  onLoginFacebook,
  onLoginGoogle,
  onEmailSignIn,
  onEmailSignUp,
}): React.ReactElement => {
  const { t } = useTranslation();

  const steps = [
    {
      title: t('login.steps.2_authentication.title'),
      content: (
        <Step1
          onLoginFacebook={onLoginFacebook}
          onLoginGoogle={onLoginGoogle}
          goToSignUp={() => setCurrentStep(3)}
          goToSignIn={() => setCurrentStep(2)}
        />
      ),
    },
    {
      title: t('login.steps.3_email_signin.title'),
      content: (
        <Step2
          goToSignUp={() => setCurrentStep(3)}
          goBack={() => setCurrentStep(1)}
          submitHandler={onEmailSignIn}
        />
      ),
    },
    {
      title: t('login.steps.4_email_signup.title'),
      content: (
        <Step3
          backHandler={() => setCurrentStep(1)}
          goToSignIn={() => setCurrentStep(2)}
          submitHandler={onEmailSignUp}
        />
      ),
    },
  ];

  return (
    <>
      <StepsContent>{steps[currentStep].content}</StepsContent>
    </>
  );
};

const StepsContent = styled.div`
  width: 100%;
  max-width: 400px;
`;

interface RegistrationStepsProps {
  currentStep: number;
  setCurrentStep: Function;
  onLoginGoogle: Function;
  onLoginFacebook: Function;
  onEmailSignIn: Function;
  onEmailSignUp: Function;
}

export default RegistrationSteps;
