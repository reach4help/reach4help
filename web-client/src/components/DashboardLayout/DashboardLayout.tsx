import { Layout } from 'antd';
import React, { useState } from 'react';
import { User } from 'src/models/users';
import NewRequestModal from 'src/modules/request/containers/NewRequestModal/NewRequestModal';

import BottomNavbar from '../BottomNavbar/BottomNavbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import { MenuItem } from '../SideDrawerMenu/SideDrawerMenu';
import TopNavbar from '../TopNavbar/TopNavbar';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  menuItems,
  profileData,
  children,
}) => {
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const [showNewRequestModal, setShowNewRequestModal] = useState(true);
  return (
    <Layout>
      <TopNavbar />
      <SideDrawer
        collapsed={siderCollapsed}
        closeSider={() => setSiderCollapsed(true)}
        menuItems={menuItems}
        profileData={profileData}
      />
      {showNewRequestModal && (
        <NewRequestModal
          showModal={showNewRequestModal}
          closeModal={() => setShowNewRequestModal(false)}
        />
      )}
      <Layout.Content style={{ marginTop: '64px', marginBottom: '64px' }}>
        {children}
      </Layout.Content>
      {/* eslint-disable-next-line no-alert */}
      <BottomNavbar
        openMenu={() => setSiderCollapsed(false)}
        openNewRequestModal={() => setShowNewRequestModal(true)}
        openNotifications={() => alert('notifications opened')}
      />
    </Layout>
  );
};

interface DashboardLayoutProps {
  menuItems?: Array<MenuItem>;
  profileData: User;
  children?: React.ReactNode;
}

export default DashboardLayout;
