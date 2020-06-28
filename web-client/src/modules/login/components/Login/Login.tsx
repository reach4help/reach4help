import React from 'react';
import logo from 'src/assets/logo.png';
import IntroLogo from 'src/components/IntroLogo/IntroLogo';
/* TODO:  This component is a nightmare.   */
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import { COLORS } from 'src/theme/colors';

import LoginFooter from '../LoginFooter/LoginFooter';
import LoginSteps from '../LoginSteps/LoginSteps';

const Reach4HelpLogo = () => (
  <TitleWithAddon level={2} alignAddon="50%">
    <span>Reach</span>
    <span style={{ color: COLORS.brandOrange }}>4</span>
    <span>Help</span>
  </TitleWithAddon>
);

const Registration: React.FC<RegistrationProps> = (
  props,
): React.ReactElement => (
  <>
    <IntroLogo src={logo} alt="logo" />
    <Reach4HelpLogo />
    <LoginSteps {...props} />
    <LoginFooter />
  </>
);

interface RegistrationProps {
  onLoginGoogle: Function;
  onLoginFacebook: Function;
}

export default Registration;
