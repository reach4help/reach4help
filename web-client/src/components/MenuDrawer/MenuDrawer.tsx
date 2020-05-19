import { LogoutOutlined, MailOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'src/models/users';
import styled from 'styled-components';

import SideDrawerMenu, { MenuItem } from '../SideDrawerMenu/SideDrawerMenu';
import SideDrawerProfile from '../SideDrawerProfile/SideDrawerProfile';

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  visible,
  closeDrawer,
  menuItems,
  profileData,
  logoutHandler,
}) => (
  <SideDrawer
    placement="left"
    closable
    onClose={closeDrawer}
    visible={visible}
    width="100%"
  >
    <SideDrawerProfile profileData={profileData} />
    <SideDrawerMenu items={menuItems || []} closeDrawer={closeDrawer} />
    <BottomLinks>
      <Link to={{ pathname: '/' }} onClick={closeDrawer}>
        <MailOutlined />
        Contact us
      </Link>
      <div
        onClick={() => {
          closeDrawer();
          logoutHandler();
        }}
      >
        <LogoutOutlined />
        Sign out
      </div>
    </BottomLinks>
  </SideDrawer>
);

const SideDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  color: inherit;

  a,
  div {
    color: inherit;
    margin-bottom: 10px;
    padding: 0 10px;

    svg {
      margin-right: 10px;
    }
  }
`;

interface MenuDrawerProps {
  visible: boolean;
  closeDrawer: () => void;
  menuItems?: Array<MenuItem>;
  profileData?: User;
  logoutHandler: Function;
}

export default MenuDrawer;
