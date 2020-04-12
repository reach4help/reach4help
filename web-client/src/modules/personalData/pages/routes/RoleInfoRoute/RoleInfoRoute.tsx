import React from 'react';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';
import RoleInfoContainer from 'src/modules/personalData/containers/RoleInfoContainer/RoleInfoContainer';

const PersonalDataRoute: React.FC = () => (
  <GradientBackground>
    <CenteredCard>
      <RoleInfoContainer />
    </CenteredCard>
  </GradientBackground>
);

export default PersonalDataRoute;
