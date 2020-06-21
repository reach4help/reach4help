import { Typography } from 'antd';
import { COLORS } from 'src/theme/colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from 'src/assets/logo.png';
import IntroLogo from 'src/components/IntroLogo/IntroLogo';
/* TODO:  This component is a nightmare.   */
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';

import LoginSteps from '../LoginSteps/LoginSteps';

const { Title } = Typography;

const Reach4HelpLogo = () => (
  <TitleWithAddon level={2} alignAddon="50%">
    <span>Reach</span>
    <span style={{ color: COLORS.brandOrange }}>4</span>
    <span>Help</span>
  </TitleWithAddon>
);

const Login: React.FC<LoginProps> = (props): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <IntroLogo src={logo} alt="logo" />
      <Reach4HelpLogo />
      <LoginSteps {...props} />
    </>
  );
};
interface LoginProps {
  onLoginGoogle: Function;
  onLoginFacebook: Function;
}

export default Login;
