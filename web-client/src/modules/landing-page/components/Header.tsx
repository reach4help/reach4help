import React from 'react';

import betaFlair from '../assets/beta_flair.svg';
import logo from '../assets/logo.svg';
import {
  BetaFlair,
  ButtonContainer,
  Link,
  LinkContainer,
  LogInButton,
  Logo,
  LogoContainer,
  Nav,
  SignUpButton,
} from './figma';

const Header: React.FC = (): JSX.Element => (
  <Nav>
    <LogoContainer>
      <Logo src={logo} />
      <BetaFlair src={betaFlair} />
    </LogoContainer>

    <LinkContainer>
      <Link href="/home/about">About Us</Link>
      <Link href="/">Partners</Link>
      <Link href="/">FAQs</Link>
      <Link href="/">Mutual Aid Map</Link>
    </LinkContainer>

    <ButtonContainer>
      <LogInButton>Log In</LogInButton>
      <SignUpButton>Sign In</SignUpButton>
    </ButtonContainer>
  </Nav>
);

export default Header;
