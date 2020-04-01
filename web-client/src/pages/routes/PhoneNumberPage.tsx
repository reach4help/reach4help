import React from 'react';

import CenteredCard from '../../components/CenteredCard/CenteredCard';
import GradientBackground from '../../components/GradientBackground/GradientBackground';
import PhoneNumber from '../../components/PhoneNumber/PhoneNumber';

const PhoneNumberPage: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const handleFormSubmit = (values: { body: string; title: string }) => {
    // console.log('Form Data:', values);
  };

  return (
    <GradientBackground>
      <CenteredCard>
        <PhoneNumber handleFormSubmit={handleFormSubmit} />
      </CenteredCard>
    </GradientBackground>
  );
};

export default PhoneNumberPage;
