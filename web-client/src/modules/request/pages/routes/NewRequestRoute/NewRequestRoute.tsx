import React, { ReactElement } from 'react';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';

import NewRequestFormContainer from '../../../containers/NewRequestFormContainer/NewRequestFormContainer';

const NewRequestRoute: React.FC = (): ReactElement => (
  <GradientBackground>
    <CenteredCard>
      <NewRequestFormContainer />
    </CenteredCard>
  </GradientBackground>
);
export default NewRequestRoute;
