import React from 'react';

import LoginFooter from '../LoginFooter/LoginFooter';
import LoginSteps from '../LoginSteps/LoginSteps';

const Registration: React.FC<RegistrationProps> = (
  props,
): React.ReactElement => (
  <>
    <LoginSteps {...props} />
    <LoginFooter />
  </>
);

interface RegistrationProps {
  onLoginGoogle: Function;
  onLoginFacebook: Function;
}

export default Registration;
