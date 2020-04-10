import React, { ReactElement } from 'react';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';
import PhoneVerifyContainer from 'src/modules/phone/containers/PhoneVerifyContainer/PhoneVerifyContainer';

const PhoneVerifyRoute: React.FC = (): ReactElement => (
  <GradientBackground>
    <CenteredCard>
      <PhoneVerifyContainer />
    </CenteredCard>
  </GradientBackground>
);
export default PhoneVerifyRoute;
