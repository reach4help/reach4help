import React from 'react';

import CenteredCard from '../components/CenteredCard/CenteredCard';
import GradientBackground from '../components/GradientBackground/GradientBackground';
import LoginIntro from '../components/LoginIntro/LoginIntro';

const LoginPage: React.FC = () => (
  <GradientBackground>
    <CenteredCard>
      <LoginIntro />
    </CenteredCard>
  </GradientBackground>
);

export default LoginPage;
