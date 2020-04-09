import React, { ReactElement } from 'react';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';
import { PhoneNumberSteps } from 'src/containers/PhoneNumberContainer/constants';
import PhoneNumberVerifierContainer from 'src/containers/PhoneNumberContainer/PhoneNumberContainer';

const PhoneEntryRoute: React.FC = (): ReactElement => (
  <GradientBackground>
    <CenteredCard>
      <PhoneNumberVerifierContainer type={PhoneNumberSteps.ENTRY} />
    </CenteredCard>
  </GradientBackground>
);
export default PhoneEntryRoute;
