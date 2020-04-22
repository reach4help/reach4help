import React from 'react';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';

import PersonalDataFormContainer from '../../../containers/PersonalDataFormContainer/PersonalDataFormContainer';

const PersonalDataRoute: React.FC = () => (
  <GradientBackground>
    <CenteredCard>
      <PersonalDataFormContainer />
    </CenteredCard>
  </GradientBackground>
);

export default PersonalDataRoute;
