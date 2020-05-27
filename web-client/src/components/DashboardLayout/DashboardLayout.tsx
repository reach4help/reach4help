import { Layout } from 'antd';
import React, { useState } from 'react';
import NewRequestModal from 'src/components/NewRequestModal/NewRequestModal';
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
  logoutHandler,
  modalSubmitHandler,
  modalStateHandler,
  modalError,
  modalState,
  modalSuccess = false,
  modalLoading = false,
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
      />
      <NotificationsDrawer
        visible={notificationVisible}
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
        openNewRequestModal={() => modalStateHandler(true)}
        openNotifications={() => setNotificationVisible(true)}
        isCav={isCav}
      />
      {modalState && (
        <NewRequestModal
          showModal={modalState}
          closeModal={() => modalStateHandler(false)}
          createRequest={modalSubmitHandler}
          success={modalSuccess}
          loading={modalLoading}
          error={modalError}
        />
      )}
    </Layout>
  );
};

interface DashboardLayoutProps {
  menuItems?: Array<MenuItem>;
  profileData?: User;
  children?: React.ReactNode;
  isCav?: boolean;
  logoutHandler: Function;
  modalSubmitHandler: Function;
  modalStateHandler: Function;
  modalState: boolean;
  modalSuccess: boolean;
  modalLoading: boolean;
  modalError?: Error;
}

export default DashboardLayout;
