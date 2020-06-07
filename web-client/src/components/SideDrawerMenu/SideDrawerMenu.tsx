import { Menu } from 'antd';
import React from 'react';
import { Link, RouteProps } from 'react-router-dom';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const SideDrawerMenuItem: React.FC<SideDrawerMenuItemProps> = ({
  item,
  closeDrawer,
  ...other
}) => {
  let menuItem: React.ReactNode;
  if (item.children) {
    menuItem = (
      <Menu.SubMenu
        key={item.id}
        title={
          <>
            {item.icon ? <item.icon /> : null}
            {item.title}
          </>
        }
        {...other}
      >
        {item.children.map((subItem: MenuItem) => (
          <SideDrawerMenuItem
            key={subItem.id}
            item={subItem}
            closeDrawer={closeDrawer}
            {...other}
          />
        ))}
      </Menu.SubMenu>
    );
  } else {
    menuItem = (
      <Menu.Item key={item.id} {...other}>
        {item.icon ? <item.icon /> : null}
        {item.title}
      </Menu.Item>
    );
  }
  return (
    <>
      {item.location ? (
        <Link to={{ pathname: item.location.path }} onClick={closeDrawer}>
          {menuItem}
        </Link>
      ) : (
        menuItem
      )}
    </>
  );
};

const SideDrawerMenu: React.FC<SideDrawerMenuProps> = ({
  items,
  closeDrawer,
  isCav,
}) => (
  <Wrapper isCav={isCav}>
    <Menu mode="inline">
      {items.map((item: MenuItem, index) => (
        <SideDrawerMenuItem key={index} item={item} closeDrawer={closeDrawer} />
      ))}
    </Menu>
  </Wrapper>
);

const Wrapper = styled('div')<{ isCav?: boolean }>`
  flex: auto;

  .ant-menu {
    background: ${COLORS.backgroundLightGray};
    font-weight: bold;

    .ant-menu-item {
      margin: 0;

      &:after {
        display: none;
      }
      &:hover {
        color: white;
        font-weight: 700;
        background-color: ${props =>
          props.isCav ? COLORS.link : COLORS.brandOrange};
      }
    }

    .ant-menu-submenu {
      .ant-menu-submenu-title {
        margin: 0;
        color: ${props => (props.isCav ? COLORS.link : COLORS.brandOrange)};
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
      background: ${props =>
        props.isCav ? COLORS.link : COLORS.brandOrange} !important;
    }
  }
`;

export interface MenuItem {
  id: string;
  icon?: React.FunctionComponent<{}> | React.ComponentClass<{}, any>;
  title: string;
  children?: Array<MenuItem>;
  location?: { path: string };
}

interface SideDrawerMenuItemProps extends RouteProps {
  item: MenuItem;
  closeDrawer: () => void;
}

interface SideDrawerMenuProps extends RouteProps {
  items: Array<MenuItem>;
  closeDrawer: () => void;
  isCav?: boolean;
}

export default SideDrawerMenu;
