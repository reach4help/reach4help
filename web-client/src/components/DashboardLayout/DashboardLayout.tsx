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
    <StyledLayout>
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
      <StyledLayoutContent>{children}</StyledLayoutContent>
      <BottomNavbar
        openMenu={() => setMenuVisible(true)}
        openNotifications={() => setNotificationVisible(true)}
        isCav={isCav}
      />
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const StyledLayoutContent = styled(Layout.Content)`
  margin: 64px 0;
  overflow: scroll;
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
