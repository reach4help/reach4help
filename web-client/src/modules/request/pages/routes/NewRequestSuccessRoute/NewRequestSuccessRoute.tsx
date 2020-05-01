import React, { ReactElement } from 'react';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';

import NewRequestSuccessContainer from '../../../containers/NewRequestSuccessContainer/NewRequestSuccessContainer';

const NewRequestRoute: React.FC = (): ReactElement => (
  <GradientBackground>
    <CenteredCard>
      <NewRequestSuccessContainer />
    </CenteredCard>
  </GradientBackground>
);
export default NewRequestRoute;
