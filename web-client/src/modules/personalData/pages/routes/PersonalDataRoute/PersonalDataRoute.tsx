import React from 'react';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';

import PersonaDataFormContainer from '../../../containers/PersonalDataFormContainer/PersonalDataFormContainer';

const PersonalDataRoute: React.FC = () => (
  <GradientBackground>
    <CenteredCard>
      <PersonaDataFormContainer />
    </CenteredCard>
  </GradientBackground>
);

export default PersonalDataRoute;
