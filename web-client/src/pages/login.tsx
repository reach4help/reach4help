import React from 'react';

import CenteredCard from '../components/CenteredCard/CenteredCard';
import GradientBackground from '../components/GradientBackground/GradientBackground';
import LoginContainer from '../containers/LoginContainer';

const LoginPage: React.FC = () => (
  <GradientBackground>
    <CenteredCard>
      <LoginContainer />
    </CenteredCard>
  </GradientBackground>
);

export default LoginPage;
