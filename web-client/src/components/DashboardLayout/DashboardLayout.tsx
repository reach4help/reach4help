import { Layout } from 'antd';
import React, { useState } from 'react';
import { OffersState } from 'src/ducks/offers/types';
import { User } from 'src/models/users';

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
    <Layout>
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
      <Layout.Content
        style={{ marginTop: '64px', height: '90vh', overflow: 'auto' }}
      >
        {children}
      </Layout.Content>
      <BottomNavbar
        openMenu={() => setMenuVisible(true)}
        openNotifications={() => setNotificationVisible(true)}
        isCav={isCav}
      />
    </Layout>
  );
};

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
