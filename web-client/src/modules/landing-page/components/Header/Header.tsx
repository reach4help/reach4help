import React from 'react';

import betaFlair from '../../assets/beta_flair.svg';
import langLogo from '../../assets/langLogo.svg';
import logo from '../../assets/logo.svg';
import {
  BetaFlair,
  ButtonContainer,
  Dropdown,
  Link,
  LinkContainer,
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

    <LinkContainer>
      <Link href="/about">About Us</Link>
      <Link href="/">Partners</Link>
      <Link href="/">FAQs</Link>
      <Link href="/">Mutual Aid Map</Link>
    </LinkContainer>

    <Dropdown>
      <Logo src={langLogo} height="25px" />
      <ul>
        <li>English</li>
        <li>Portuguese</li>
        <li>French</li>
      </ul>
    </Dropdown>

    <ButtonContainer>
      <LogInButton>Log In</LogInButton>
      <SignUpButton>Sign In</SignUpButton>
    </ButtonContainer>
  </Nav>
);

export default Header;
