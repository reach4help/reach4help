import React from 'react';

import betaFlair from '../../assets/beta_flair.svg';
import logo from '../../assets/logo.svg';
import {
  BetaFlair,
  ButtonContainer,
  LogInButton,
  Logo,
  LogoContainer,
  Nav,
  SignUpButton,
} from './elements';

const Header: React.FC = (): JSX.Element => (
  <Nav>
    <LogoContainer>
      <Logo src={logo} />
      <BetaFlair src={betaFlair} />
    </LogoContainer>

    <ButtonContainer>
      <LogInButton>Log In</LogInButton>
      <SignUpButton>Sign In</SignUpButton>
    </ButtonContainer>
  </Nav>
);

export default Header;
