import {
  CaretDownOutlined,
  CloseOutlined,
  MenuOutlined,
  BellFilled as NotificationsIcon,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoType from 'src/assets/logo-type.svg';
import { DEVICE_MAX } from 'src/constants/mediaQueries';
import {
  CreateOfferLocationUrl,
  CreateRequestLocationUrl,
} from 'src/modules/create/constants';
import { AboutPageLocation } from 'src/modules/landing-page/constants';
import { LoginLocation } from 'src/modules/login/constants';
import {
  FindRequestsLocation,
  MyOfferPostsLocationUrl,
  MyRequestPostsLocationUrl,
} from 'src/modules/MyPosts/constants';
import { AppState } from 'src/store';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import { LanguageSelector } from '../SideBottomMenu/LanguageSelector';

interface TopNavbarProps {
  toggleMenu: () => void;
  toggleNotifications: () => void;
  visible?: boolean;
  unseenOffersCount: number;
}

const TopNavbar: React.FC<TopNavbarProps> = ({
  visible,
  toggleMenu,
  // openNotifications,
  // unseenOffersCount,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const onboarded = useSelector((state: AppState) => state.auth.onboarded);
  const isLoggedIn = useSelector((state: AppState) => !!state.auth.user?.email);
  const { t } = useTranslation();

  const createNewMenu = (
    <Menu>
      <Menu.Item key="0">
        <StyledLink to={CreateRequestLocationUrl}>
          {t('navbar.create_new.options.request')}
        </StyledLink>
      </Menu.Item>
      <Menu.Item key="1">
        <StyledLink to={CreateOfferLocationUrl}>
          {t('navbar.create_new.options.offer')}
        </StyledLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderContainer>
      <TopNavbarWrapper>
        <LeftLinkContainer>
          <SideMenuIcon onClick={toggleMenu}>
            {visible ? <MenuOutlined /> : <CloseOutlined />}
          </SideMenuIcon>

          <HomeButton to="/">
            <img src={LogoType} alt="Reach4Help" style={{ width: '155px' }} />
          </HomeButton>

          <LinkContainer>
            <StyledLink to={FindRequestsLocation}>
              {t('navbar.home')}
            </StyledLink>
            <StyledLink to={MyRequestPostsLocationUrl}>
              {t('navbar.my_requests')}
            </StyledLink>
            <StyledLink to={MyOfferPostsLocationUrl}>
              {t('navbar.my_offers')}
            </StyledLink>

            <Dropdown overlay={createNewMenu} trigger={['click']}>
              <StyledLink as="a">
                {t('navbar.create_new.title')} <CaretDownOutlined />
              </StyledLink>
            </Dropdown>

            <StyledLink to={AboutPageLocation.path}>
              {t('navbar.about')}
            </StyledLink>
          </LinkContainer>
        </LeftLinkContainer>

        <LinkContainer>
          <LanguageSelector />
          {isLoggedIn ? (
            <NotificationsIcon />
          ) : (
            <>
              <LoginButton>
                <StyledLinkButton to={LoginLocation.path}>
                  {t('navbar.login')}
                </StyledLinkButton>
              </LoginButton>

              <SignUpButton>
                <StyledLinkButton to={LoginLocation.path}>
                  {t('navbar.sign_up')}
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
  justify-content: center;
  width: 100%;
  height: 64px;
  z-index: 20;
`;

const TopNavbarWrapper = styled.div`
  display: flex;
  max-width: 1440px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 2em 0;

  @media ${DEVICE_MAX.tablet} {
    justify-content: flex-start;
    margin: 0 1em 0;
  }
`;

const LeftLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3em;

  @media ${DEVICE_MAX.tablet} {
    gap: 0;
  }
`;

const SideMenuIcon = styled.div`
  display: none;
  font-size: 1.2rem;
  margin-right: 1em;

  @media ${DEVICE_MAX.tablet} {
    display: block;
  }
`;

const HomeButton = styled(Link)`
  display: flex;
  gap: 0.5em;
  justify-content: center;
  align-items: center;
`;

const LinkContainer = styled.nav`
  display: flex;
  gap: 20px;
  justify-content: space-evenly;
  align-items: center;

  @media ${DEVICE_MAX.tablet} {
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
  color: ${COLORS.primaryOrange};

  position: relative;
  border: 2px solid ${COLORS.primaryOrange};
  }
`;

const SignUpButton = styled(AuthButton)`
  background: ${COLORS.primaryOrange};
  border: none;
  color: white;
`;

const StyledLinkButton = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
`;

export default TopNavbar;
