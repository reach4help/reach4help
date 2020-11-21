import { Menu } from 'antd';
import React from 'react';
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

const SideMenuLink: React.FC<{
  key: string;
  title: string;
  path: string;
  onClick: () => void;
}> = ({ key, title, path, onClick, ...other }) => (
  <Link to={path} onClick={onClick}>
    <Menu.Item key={key} {...other}>
      {title}
    </Menu.Item>
  </Link>
);

const SideTopMenu: React.FC<{
  closeDrawer: () => void;
  isLoggedIn: boolean;
}> = ({ closeDrawer, isLoggedIn }) => (
  <SideTopMenuStyle>
    <Menu mode="inline">
      <SideMenuLink
        key="Home"
        title="Home"
        path="/home"
        onClick={closeDrawer}
      />

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
      <SideMenuLink
        key="CreateRequest"
        title="Create Request"
        path={CreateRequestLocationUrl}
        onClick={closeDrawer}
      />
      <SideMenuLink
        key="CreateOffer"
        title="Create Offer - not implemented"
        path={`notimplemented:${CreateOfferLocationUrl}` /* TODO: implement */}
        onClick={closeDrawer}
      />
    </Menu>
  </SideTopMenuStyle>
);

const SideTopMenuStyle = styled('div')`
  flex: auto;

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

export default SideTopMenu;
