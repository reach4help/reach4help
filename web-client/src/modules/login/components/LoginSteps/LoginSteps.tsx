import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Step1 from './Step1SelectLanguage';
import Step3 from './Step3Authentication';
import Step4 from './Step4EmailLogin';

const LoginSteps: React.FC<LoginStepsProps> = ({
  onLoginFacebook,
  onLoginGoogle,
}): React.ReactElement => {
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState<number>(0);

  function firebaseEmailAuth() {
    document.title = 'auth clicked';
  }

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
          submitHandler={firebaseEmailAuth}
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

interface LoginStepsProps {
  onLoginGoogle: Function;
  onLoginFacebook: Function;
}

export default LoginSteps;
