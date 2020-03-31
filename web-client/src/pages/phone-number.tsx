import React from 'react';

import CenteredCard from '../components/CenteredCard/CenteredCard';
import GradientBackground from '../components/GradientBackground/GradientBackground';
import PhoneNumber from '../components/PhoneNumber/PhoneNumber';

const PhoneNumberPage: React.FC = () => (
  <GradientBackground>
    <CenteredCard>
      <PhoneNumber />
    </CenteredCard>
  </GradientBackground>
);

export default PhoneNumberPage;
