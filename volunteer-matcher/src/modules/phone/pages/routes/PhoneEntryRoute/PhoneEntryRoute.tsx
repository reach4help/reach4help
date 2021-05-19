import React, { ReactElement } from 'react';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';
import PhoneEntryContainer from 'src/modules/phone/containers/PhoneEntryContainer/PhoneEntryContainer';

const PhoneEntryRoute: React.FC = (): ReactElement => (
  <GradientBackground>
    <CenteredCard>
      <PhoneEntryContainer />
    </CenteredCard>
  </GradientBackground>
);
export default PhoneEntryRoute;
