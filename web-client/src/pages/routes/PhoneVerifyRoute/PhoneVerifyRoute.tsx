import React, { ReactElement } from 'react';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';
import { PhoneNumberSteps } from 'src/containers/PhoneNumberContainer/constants';
import PhoneNumberVerifierContainer from 'src/containers/PhoneNumberContainer/PhoneNumberContainer';

const PhoneVerifyRoute: React.FC = (): ReactElement => (
  <GradientBackground>
    <CenteredCard>
      <PhoneNumberVerifierContainer type={PhoneNumberSteps.VERIFY} />
    </CenteredCard>
  </GradientBackground>
);
export default PhoneVerifyRoute;
