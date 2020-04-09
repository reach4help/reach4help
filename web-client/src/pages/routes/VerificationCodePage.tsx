import React from 'react';

import CenteredCard from '../../components/CenteredCard/CenteredCard';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import VerificationCode from '../../components/VerificationCode/VerificationCode';

const VerificationCodePage: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const handleFormSubmit = (values: { body: string; title: string }) => {
    // console.log('Form Data:', values);
  };

  return (
    <GradientBackground>
      <CenteredCard>
        <VerificationCode handleFormSubmit={handleFormSubmit} />
      </CenteredCard>
    </GradientBackground>
  );
};

export default VerificationCodePage;
