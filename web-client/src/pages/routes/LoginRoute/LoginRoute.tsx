import get from 'lodash/get';
import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import CenteredCard from '../../../components/CenteredCard/CenteredCard';
import GradientBackground from '../../../components/GradientBackground/GradientBackground';
import LoginContainer from '../../../containers/LoginContainer/LoginContainer';

const LoginRoute: React.FC = (): ReactElement => {
  const location = useLocation();
  return (
    <GradientBackground>
      <CenteredCard>
        <LoginContainer redirectBack={get(location, 'state.redirectBack')} />
      </CenteredCard>
    </GradientBackground>
  );
};
export default LoginRoute;
