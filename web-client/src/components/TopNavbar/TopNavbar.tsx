import {
  CaretDownOutlined,
  CloseOutlined,
  MenuOutlined,
  BellFilled as NotificationsIcon,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoType from 'src/assets/logo-type.svg';
import Logo from 'src/assets/logo.svg';
import {
  CreateOfferLocationUrl,
  CreateRequestLocationUrl,
} from 'src/modules/create/constants';
import { AboutPageLocation } from 'src/modules/landing-page/constants';
import { LoginLocation } from 'src/modules/login/constants';
import {
  MyOfferPostsLocationUrl,
  MyRequestPostsLocationUrl,
} from 'src/modules/requests/constants';
import { AppState } from 'src/store';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import { LanguageSelector } from '../SideBottomMenu/LanguageSelector';

const TopNavbar: React.FC<TopNavbarProps> = ({
  visible,
  toggleMenu,
  // openNotifications,
  // unseenOffersCount,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const onboarded = useSelector((state: AppState) => state.auth.onboarded);
  const isLoggedIn = useSelector((state: AppState) => !!state.auth.user?.email);

  const createNewMenu = (
    <Menu>
      <Menu.Item key="0">
        <StyledLink to={CreateRequestLocationUrl}>Help Request</StyledLink>
      </Menu.Item>
      <Menu.Item key="1">
        <StyledLink to={CreateOfferLocationUrl}>Volunteer Offer</StyledLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderContainer>
      <TopNavbarWrapper>
        <SideMenuIcon onClick={toggleMenu}>
          {visible ? <MenuOutlined /> : <CloseOutlined />}
        </SideMenuIcon>

        <HomeButton to="/">
          <img src={Logo} alt="R4H Logo" style={{ height: '32px' }} />
          <img src={LogoType} alt="Reach4Help" style={{ height: '20px' }} />
        </HomeButton>

        <LinkContainer>
          <StyledLink to={MyRequestPostsLocationUrl}>Help Requests</StyledLink>
          <StyledLink to={MyOfferPostsLocationUrl}>Volunteer Offers</StyledLink>

          <Dropdown overlay={createNewMenu} trigger={['click']}>
            <StyledLink as="a">
              Create New <CaretDownOutlined />
            </StyledLink>
          </Dropdown>

          <StyledLink to={AboutPageLocation.path}>About Us</StyledLink>

          <LanguageSelector />
          {!isLoggedIn ? (
            <NotificationsIcon />
          ) : (
            <>
              <LoginButton>
                <StyledLinkButton to={LoginLocation.path}>
                  Login
                </StyledLinkButton>
              </LoginButton>

              <SignUpButton>
                <StyledLinkButton to={LoginLocation.path}>
                  Sign Up
                </StyledLinkButton>
              </SignUpButton>
            </>
          )}
        </LinkContainer>
      </TopNavbarWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background: white;
  position: fixed;
  display: flex;
  width: 100%;
  height: 64px;
  z-index: 20;
`;

const TopNavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 1em 0;

  @media (max-width: 1050px) {
    justify-content: flex-start;
  }
`;

const SideMenuIcon = styled.div`
  font-size: 1.2rem;
  display: none;

  @media (max-width: 1050px) {
    display: block;
  }
`;

const HomeButton = styled(Link)`
  display: flex;
  gap: 0.5em;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-evenly;
  align-items: center;
  /* width: 60%; */

  @media (max-width: 1050px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 500;
  font-size: 16px;
  position: relative;

  :hover {
    color: ${COLORS.primaryOrange};
  }
`;

const AuthButton = styled.button`
  border: none;
  width: 85px;
  height: 35px;
  border-radius: 4px;
`;

const LoginButton = styled(AuthButton)`
  background: none;
  color: black;

  position: relative;
  left: 3%;
  &:hover {
    border: 1px solid ${COLORS.primaryOrange};
  }
`;

const SignUpButton = styled(AuthButton)`
  margin-left: 1em;
  background: ${COLORS.primaryOrange};
  border: none;
  color: white;
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledLinkButton = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
`;

interface TopNavbarProps {
  toggleMenu: () => void;
  toggleNotifications: () => void;
  visible?: boolean;
  unseenOffersCount: number;
}

export default TopNavbar;
