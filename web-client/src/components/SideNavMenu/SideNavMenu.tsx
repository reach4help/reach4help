import { Menu } from 'antd';
import React from 'react';
import { Link, RouteProps } from 'react-router-dom';
import { MenuItem } from 'src/types/menu-item';

const SideNavMenuItem: React.FC<SideNavMenuItemProps> = ({
  item,
  ...other
}) => {
  const { SubMenu } = Menu;
  let menuItem: React.ReactNode;
  if (item.children) {
    menuItem = (
      <SubMenu key={item.title} title={item.title} {...other}>
        {item.children.map((subItem: MenuItem, index) => (
          <SideNavMenuItem key={index} item={subItem} {...other} />
        ))}
      </SubMenu>
    );
  } else {
    menuItem = (
      <Menu.Item key={item.title} {...other}>
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
        <Link to={{ pathname: item.location.path }}>{menuItem}</Link>
      ) : (
        menuItem
      )}
      )
    </>
  );
};

const SideNavMenu: React.FC<SideNavMenuProps> = ({ items }) => (
  <Menu mode="inline" style={{ height: '100%' }}>
    {items.map((item: any, index) => (
      <SideNavMenuItem key={index} item={item} />
    ))}
  </Menu>
);

interface SideNavMenuItemProps extends RouteProps {
  item: MenuItem;
}

interface SideNavMenuProps extends RouteProps {
  items: Array<MenuItem>;
}

export default SideNavMenu;
