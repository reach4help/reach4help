import React, { ReactElement } from 'react';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';
import PhoneNumberVerifierContainer from 'src/containers/PhoneNumberContainer/PhoneNumberContainer';

const PhoneEntryRoute: React.FC = (): ReactElement => (
  <GradientBackground>
    <CenteredCard>
      <PhoneNumberVerifierContainer type="entry" />
    </CenteredCard>
  </GradientBackground>
);
export default PhoneEntryRoute;
