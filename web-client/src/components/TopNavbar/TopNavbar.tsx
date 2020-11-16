import {
  // BellFilled as NotificationsIcon,
  MenuOutlined as SideMenuIcon,
} from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import Logo from 'src/assets/logo.svg';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import { LanguageSelector } from '../SideBottomMenu/LanguageSelector';

const { Text } = Typography;

const TopNavbar: React.FC<TopNavbarProps> = ({
  openMenu,
  // openNotifications,
  // unseenOffersCount,
  visible = true,
}) =>
  visible ? (
    <TopNavbarWrapper>
      <NavButtonMenu aria-label="Menu Button" onClick={openMenu}>
        <SideMenuIcon />
      </NavButtonMenu>
      <NavButton>
        <IconImg src={Logo} />
        <IconText>
          Reach<TextOrange>4</TextOrange>Help
        </IconText>
      </NavButton>
      {/* <NavButton aria-label="Notifications Button" onClick={openNotifications}>
        {unseenOffersCount > 0 ? (
          <NotificationsIcon style={{ color: 'red' }} />
        ) : (
          <NotificationsIcon />
        )}
      </NavButton> */}
      <LinkContainer>
        <Link href="/home">Home</Link>
        <Link href="/404">Help Requests</Link>
        <Link href="/404">Volunteer Offers</Link>
        <Link href="/home/about">About Us</Link>
        <LanguageSelector />
        <LoginButton>Login</LoginButton>
        <SignUpButton>Sign Up</SignUpButton>
      </LinkContainer>
    </TopNavbarWrapper>
  ) : null;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & > * {
    margin: 0 20px;
  }

  @media (max-width: 918px) {
    & > * {
      display: none;
    }
    & > button:last-child {
      display: block;
    }
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
  font-weight: 500;
  font-size: 16px;
  &:hover {
    color: ${COLORS.primaryOrange};
  }
`;

const AuthButton = styled.button`
  width: 85px;
  height: 35px;
  border-radius: 4px;
`;

const LoginButton = styled(AuthButton)`
  background: none;
  color: black;
  border: none;
  &:hover {
    border: 1px solid ${COLORS.primaryOrange};
  }
`;

const SignUpButton = styled(AuthButton)`
  background: ${COLORS.primaryOrange};
  border: none;
  color: white;
  &:hover {
    transform: scale(1.05);
  }
`;

const NavButton = styled('button')`
  font-size: 1.3rem;
  background: transparent;
  border: none;
  outline: none;
  color: ${COLORS.primaryOrange};
  padding: 0 1rem;
  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    color: ${COLORS.link} !important;
    font-weight: 700;
  }
`;

const NavButtonMenu = styled(NavButton)`
  @media (min-width: 918px) {
    display: none;
  }
`;

const TopNavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  padding: 32px 0;
  background: white;
  z-index: 999;
`;

const IconImg = styled.img`
  width: 32px;
  height: 32px;

  @media (max-width: 918px) {
    display: none;
  }
`;

const IconText = styled(Text)`
  font-size: 1.2rem;
  color: ${COLORS.primaryDark};
  padding: 5px;

  @media (max-width: 918px) {
    position: relative;
    right: 20%;
  }
`;

const TextOrange = styled(Text)`
  color: #ff7b02;
`;

interface TopNavbarProps {
  openMenu: () => void;
  openNotifications: () => void;
  visible?: boolean;
  unseenOffersCount: number;
}

export default TopNavbar;
