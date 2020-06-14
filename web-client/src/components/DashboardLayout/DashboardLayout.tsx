import { Layout } from 'antd';
import React, { useState } from 'react';
import { OffersState } from 'src/ducks/offers/types';
import { User } from 'src/models/users';
import styled from 'styled-components';

import BottomNavbar from '../BottomNavbar/BottomNavbar';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer';
import { MenuItem } from '../SideDrawerMenu/SideDrawerMenu';
import TopNavbar from '../TopNavbar/TopNavbar';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  menuItems,
  profileData,
  children,
  isCav,
  offersState,
  logoutHandler,
  toggleApplicationPreference,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  return (
    <DashboardLayoutWrapper>
      <TopNavbar />
      <MenuDrawer
        visible={menuVisible}
        closeDrawer={() => setMenuVisible(false)}
        menuItems={menuItems}
        profileData={profileData}
        logoutHandler={logoutHandler}
        isCav={isCav}
        toggleApplicationPreference={toggleApplicationPreference}
      />
      <NotificationsDrawer
        visible={notificationVisible}
        offersState={offersState}
        closeDrawer={() => setNotificationVisible(false)}
        isCav={isCav}
      />
      <DashboardContent>{children}</DashboardContent>
      <BottomNavbar
        openMenu={() => setMenuVisible(true)}
        openNotifications={() => setNotificationVisible(true)}
        isCav={isCav}
      />
    </DashboardLayoutWrapper>
  );
};

const DashboardLayoutWrapper = styled(Layout)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
`;

const DashboardContent = styled(Layout.Content)`
  margin: 64px 0;
  overflow-x: hidden;
  overflow-y: scroll;
`;

interface DashboardLayoutProps {
  menuItems?: Array<MenuItem>;
  profileData?: User;
  children?: React.ReactNode;
  isCav?: boolean;
  logoutHandler: Function;
  offersState: OffersState;
  toggleApplicationPreference: Function;
}

export default DashboardLayout;
