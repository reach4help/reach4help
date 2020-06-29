import React from 'react';

import RegistrationFooter from '../RegistrationFooter/RegistrationFooter';
import RegistrationSteps from '../RegistrationSteps/RegistrationSteps';

const Registration: React.FC<RegistrationProps> = (
  props,
): React.ReactElement => (
  <>
    <RegistrationSteps {...props} />
    <RegistrationFooter />
  </>
);

interface RegistrationProps {
  onLoginGoogle: Function;
  onLoginFacebook: Function;
}

export default Registration;
