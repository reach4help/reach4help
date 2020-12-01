import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreateOfferLocationUrl,
  CreateRequestLocationUrl,
} from 'src/modules/create/constants';
import {
  MyOfferPostsLocationUrl,
  MyRequestPostsLocationUrl,
} from 'src/modules/requests/constants';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import { LanguageSelector } from '../SideBottomMenu/LanguageSelector';

const SideMenuLink: React.FC<{
  key: string;
  title: string;
  path: string;
  onClick: () => void;
}> = ({ key, title, path, onClick, ...other }) => (
  <Link to={path} onClick={onClick}>
    <StyledMenuItem key={key} {...other}>
      {title}
    </StyledMenuItem>
  </Link>
);

const SideTopMenu: React.FC<{
  closeDrawer: () => void;
  isLoggedIn: boolean;
}> = ({ closeDrawer, isLoggedIn }) => {
  const [createNewShowing, setCreateNewShowing] = useState(false);

  const SideTopMenuStyle = styled('div')`
  // margin-top: 100px;
  margin-top: ${!isLoggedIn ? '40px' : '100px'};
  flex: .65;
  display: flex;
  flex-direction: column;

  .ant-menu {
    background: ${COLORS.white};
    font-weight: bold;

    .ant-menu-item {
      margin: 0;

      &:after {
        display: none;
      }
      &:hover,
      &:focus,
      &:active,
      &:focus-within {
        color: white;
        font-weight: 700;
        // background-color: ${COLORS.link};
        color: ${COLORS.primaryOrange}
      }
    }

    .ant-menu-submenu {
      .ant-menu-submenu-title {
        margin: 0;
        color: ${COLORS.link};
      }
      .ant-menu-sub {
        background-color: inherit;
      }
    }

    a,
    .ant-menu-item-only-child {
      color: inherit;
    }

    a .ant-menu-item-selected {
      color: white;
      background: ${COLORS.link} !important;
    }
  }
`;

  const StyledMenu = styled(Menu)`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    bottom: 5%;
    transition: 1s ease all;
  `;

  const CreateNew = styled('div')`
    position: relative;
    left: 17%;
    overflow: hidden;
    height: 44%;
    z-index: 2;
    bottom: 5%;

    h4 {
      position: relative;
      top: 20%;
      font-size: 24px;
      font-weight: 700;

      svg {
        position: relative;
        top: 2.5px;
      }
    }
  `;

  const CreateNewMenu = createNewShowing
    ? styled(StyledMenu)`
        top: 20%;
        bottom: 0%;
      `
    : styled(StyledMenu)`
        bottom: 150%;
      `;

  const AboutSideMenuLink = createNewShowing
    ? styled(SideMenuLink)`
        bottom: 20%;
      `
    : styled(SideMenuLink)`
        bottom: 225%;
      `;

  return (
    <SideTopMenuStyle>
      <StyledMenu mode="inline">
        <SideMenuLink
          key="Home"
          title="Home"
          path="/home"
          onClick={closeDrawer}
        />

        {true && (
          <SideMenuLink
            key="HelpRequests"
            title="Help Requests"
            path={MyOfferPostsLocationUrl}
            onClick={closeDrawer}
          />
        )}

        {true && (
          <SideMenuLink
            key="VolunteerOffers"
            title="Volunteer Offers"
            path={MyOfferPostsLocationUrl}
            onClick={closeDrawer}
          />
        )}

        {isLoggedIn && (
          <CreateNew
            onClick={() => setCreateNewShowing(!createNewShowing)}
            // render me conditionally (when the user's logged in)
          >
            <h4>
              Create New
              {!createNewShowing ? <CaretDownOutlined /> : <CaretUpOutlined />}
            </h4>
            <CreateNewMenu mode="inline">
              <SideMenuLink
                key="CreateRequest"
                title="Create Request"
                path={CreateRequestLocationUrl}
                onClick={closeDrawer}
              />
              <SideMenuLink
                key="CreateOffer"
                title="Create Offer - not implemented"
                path={CreateOfferLocationUrl}
                onClick={closeDrawer}
              />
            </CreateNewMenu>
          </CreateNew>
        )}

        {isLoggedIn && (
          <SideMenuLink
            key="MyRequests"
            title="My Requests"
            path={MyRequestPostsLocationUrl}
            onClick={closeDrawer}
          />
        )}
        {isLoggedIn && (
          <SideMenuLink
            key="MyOffers"
            title="My Offers"
            path={MyOfferPostsLocationUrl}
            onClick={closeDrawer}
          />
        )}

        {!isLoggedIn ? (
          <SideMenuLink
            key="AboutUs"
            title="About Us"
            path="/home/about"
            onClick={closeDrawer}
          />
        ) : (
          <AboutSideMenuLink
            key="AboutUs"
            title="About Us"
            path="/home/about"
            onClick={closeDrawer}
          />
        )}
      </StyledMenu>

      <LanguageSelectorContainer>
        <LanguageSelector />
      </LanguageSelectorContainer>
    </SideTopMenuStyle>
  );
};

const StyledMenuItem = styled(Menu.Item)`
  font-size: 24px;
  font-weight: 700;
  position: relative;
  left: 10%;
`;

const LanguageSelectorContainer = styled.div`
  display: flex;
  position: relative;
  bottom: 10%;
`;

export default SideTopMenu;
