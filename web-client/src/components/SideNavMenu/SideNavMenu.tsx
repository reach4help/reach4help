import { Menu } from 'antd';
import React from 'react';
import { Link, RouteProps } from 'react-router-dom';
import { COLORS } from 'src/theme/colors';
import { MenuItem } from 'src/types/menu-item';
import styled from 'styled-components';

const SideNavMenuItem: React.FC<SideNavMenuItemProps> = ({
  item,
  closeSider,
  ...other
}) => {
  const { SubMenu } = Menu;
  let menuItem: React.ReactNode;
  if (item.children) {
    menuItem = (
      <SubMenu
        key={item.id}
        title={
          <>
            {item.icon}
            {item.title}
          </>
        }
        {...other}
      >
        {item.children.map((subItem: MenuItem) => (
          <SideNavMenuItem
            key={subItem.id}
            item={subItem}
            closeSider={closeSider}
            {...other}
          />
        ))}
      </SubMenu>
    );
  } else {
    menuItem = (
      <Menu.Item key={item.id} {...other}>
        {item.icon || null}
        {item.title}
      </Menu.Item>
    );
  }
  return (
    <>
      {item.location ? (
        // TODO I couldn't find a proper way here to solve type errors
        // TODO Location is a JS library
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        <Link to={{ pathname: item.location.path }} onClick={closeSider}>
          {menuItem}
        </Link>
      ) : (
        menuItem
      )}
    </>
  );
};

const SideNavMenu: React.FC<SideNavMenuProps> = ({ items, closeSider }) => (
  <SideNavMenuWrapper>
    <Menu mode="inline">
      {items.map((item: MenuItem, index) => (
        <SideNavMenuItem key={index} item={item} closeSider={closeSider} />
      ))}
    </Menu>
  </SideNavMenuWrapper>
);

const SideNavMenuWrapper = styled.div`
  .ant-menu {
    background: ${COLORS.backgroundLightGray};

    .ant-menu-item {
      margin: 0;

      &:after {
        display: none;
      }
    }

    .ant-menu-submenu {
      &.ant-menu-submenu-active {
        color: inherit;
      }

      .ant-menu-submenu-title {
        margin: 0;
      }
      .ant-menu-sub {
        background-color: inherit;
      }
    }

    a,
    .ant-menu-item-only-child,
    .ant-menu-submenu-title {
      color: inherit;
      // font-size: 0.8rem;
      font-weight: bold;
    }

    a .ant-menu-item-selected {
      color: white;
      background: ${COLORS.link} !important;
    }
  }

  .ant-menu-item:hover,
  .ant-menu-item-active,
  .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
  .ant-menu-submenu-active,
  .ant-menu-submenu-title:hover {
    color: inherit;
  }
`;

interface SideNavMenuItemProps extends RouteProps {
  item: MenuItem;
  closeSider: () => void;
}

interface SideNavMenuProps extends RouteProps {
  items: Array<MenuItem>;
  closeSider: () => void;
}

export default SideNavMenu;
