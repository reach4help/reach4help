import { Layout } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DEVICE_MAX } from 'src/constants/mediaQueries';
import { ProfileState } from 'src/ducks/profile/types';
import styled from 'styled-components';

import BottomNavbar from '../BottomNavbar/BottomNavbar';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer';
import TopNavbar from '../TopNavbar/TopNavbar';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  logoutHandler,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const userProfile = profileState.profile;

  return (
    <DashboardLayoutWrapper>
      <TopNavbar
        visible={!menuVisible && !notificationVisible}
        toggleMenu={() => setMenuVisible(!menuVisible)}
        toggleNotifications={() => setNotificationVisible(!notificationVisible)}
        unseenOffersCount={0}
      />
      <MenuDrawer
        visible={menuVisible}
        closeDrawer={() => setMenuVisible(false)}
        profileData={userProfile}
        logoutHandler={logoutHandler}
      />
      {/* TODO: Replace with getstream */}
      <NotificationsDrawer
        visible={notificationVisible}
        closeDrawer={() => setNotificationVisible(false)}
      />
      <DashboardContent>{children}</DashboardContent>
      <BottomNavbar
        visible={!menuVisible && !notificationVisible}
        openMenu={() => setMenuVisible(true)}
        openNotifications={() => setNotificationVisible(true)}
        // isCav={isCav}
        unseenOffersCount={0}
      />
    </DashboardLayoutWrapper>
  );
};

const DashboardLayoutWrapper = styled.div``;

const DashboardContent = styled(Layout.Content)`
  position: relative;
  padding-top: 64px;

  @media ${DEVICE_MAX.tablet} {
    padding-bottom: 64px;
  }
  overflow-x: hidden;
  overflow-y: hidden;
`;

interface DashboardLayoutProps {
  children?: React.ReactNode;
  logoutHandler: Function;
}

export default DashboardLayout;
