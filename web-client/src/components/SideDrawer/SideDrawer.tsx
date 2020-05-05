import { CloseOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'src/models/users';
import styled from 'styled-components';

import SideDrawerMenu, { MenuItem } from '../SideDrawerMenu/SideDrawerMenu';
import SideDrawerProfile from '../SideDrawerProfile/SideDrawerProfile';

const SideDrawer: React.FC<SideDrawerProps> = ({
  collapsed,
  closeSider,
  menuItems,
  profileData,
}) => (
  <Sider collapsed={collapsed} theme="light">
    <CloseButton onClick={closeSider}>
      <CloseOutlined />
    </CloseButton>
    <SideDrawerProfile profileData={profileData} />
    <SideDrawerMenu items={menuItems || []} closeSider={closeSider} />
    <BottomLinks>
      <Link to={{ pathname: '/' }} onClick={closeSider}>
        <MailOutlined />
        Contact us
      </Link>
      <Link to={{ pathname: '/' }} onClick={closeSider}>
        <LogoutOutlined />
        Sign out
      </Link>
    </BottomLinks>
  </Sider>
);

const Sider = styled(Layout.Sider)`
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px;
  background: inherit;
  border: none;
  outline: none;
`;

const BottomLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  color: inherit;

  a {
    color: inherit;
    margin-bottom: 10px;
    padding: 0 10px;

    svg {
      margin-right: 10px;
    }
  }
`;

interface SideDrawerProps {
  collapsed: boolean;
  closeSider: () => void;
  menuItems?: Array<MenuItem>;
  profileData: User;
}

export default SideDrawer;
