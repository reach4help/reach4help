import React from 'react';
import { useTranslation } from 'react-i18next';

import Step1 from './Step1SelectLanguage';
import Step3 from './Step3Authentication';
import Step4 from './Step4EmailRegistration';

const RegistrationSteps: React.FC<RegistrationStepsProps> = ({
  currentStep,
  setCurrentStep,
  onLoginFacebook,
  onLoginGoogle,
  onEmailSignInUp,
}): React.ReactElement => {
  const { t } = useTranslation();

  const steps = [
    {
      title: t('login.steps.1_select_language.title'),
      content: <Step1 incrementStep={() => setCurrentStep(1)} />,
    },
    {
      title: t('login.steps.3_authentication.title'),
      content: (
        <Step3
          onLoginFacebook={onLoginFacebook}
          onLoginGoogle={onLoginGoogle}
          incrementStep={() => setCurrentStep(2)}
        />
      ),
    },
    {
      title: t('login.steps.4_email_login.title'),
      content: (
        <Step4
          backHandler={() => setCurrentStep(1)}
          submitHandler={onEmailSignInUp}
        />
      ),
    },
  ];

  return (
    <>
      <div className="steps-content">{steps[currentStep].content}</div>
    </>
  );
};

interface RegistrationStepsProps {
  currentStep: number;
  setCurrentStep: Function;
  onLoginGoogle: Function;
  onLoginFacebook: Function;
  onEmailSignInUp: Function;
}

export default RegistrationSteps;
