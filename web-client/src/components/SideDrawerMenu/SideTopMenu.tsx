import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  CreateOfferLocation,
  CreateRequestLocation,
} from 'src/modules/create/constants';
import {
  AcceptedRequestsLocation,
  MyOffersLocation,
  MyRequestsLocation,
  OpenRequestsLocation,
} from 'src/modules/requests/constants';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const SideMenuLink: React.FC<
{key: string;
title: string;
path: string;
onClick: () => void;}
> = ({
  key,
  title,
  path,
  onClick,
  ...other
}) => (
  <>
    <Link to={path} onClick={onClick}>
      <Menu.Item key={key} {...other}>
        {title}
      </Menu.Item>

    </Link>
  </>
  );

const SideTopMenu: React.FC<{closeDrawer: () => void; isLoggedIn: boolean}> = ({
  closeDrawer,
  isLoggedIn,
}) => (
  <SideTopMenuStyle>
    <Menu
        mode="inline"
      >
      { isLoggedIn && (
      <>
        <SideMenuLink
          key="OpenRequests"
          title="Open Requests"
          path={OpenRequestsLocation.path}
          onClick={closeDrawer}
        />
        <SideMenuLink
          key="AcceptedRequests"
          title="Accepted Requests"
          path={AcceptedRequestsLocation.path}
          onClick={closeDrawer}
        />
        <SideMenuLink
          key="MyRequests"
          title="My Requests"
          path={MyRequestsLocation.path}
          onClick={closeDrawer}
        />
        <SideMenuLink
          key="MyOffers"
          title="My Offers"
          path={MyOffersLocation.path}
          onClick={closeDrawer}
        />

      </>)
}
      <SideMenuLink
          key="CreateRequest"
          title="Create Request"
          path={CreateRequestLocation.path}
          onClick={closeDrawer}
        />
      <SideMenuLink
          key="CreateOffer"
          title="Create Offer - not implemented"
          path={CreateOfferLocation.path}
          onClick={closeDrawer}
        />
    </Menu>
  </SideTopMenuStyle>
  );

const SideTopMenuStyle = styled('div')`
  flex: auto;

  .ant-menu {
    background: ${COLORS.backgroundLightGray};
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
        background-color: ${COLORS.link};
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
