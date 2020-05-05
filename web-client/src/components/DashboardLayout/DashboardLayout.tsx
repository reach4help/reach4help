import { Layout } from 'antd';
import React, { useState } from 'react';
import { User } from 'src/models/users';

import BottomNavbar from '../BottomNavbar/BottomNavbar';
import NewRequestModal from '../NewRequestModal/NewRequestModal';
import SideDrawer from '../SideDrawer/SideDrawer';
import { MenuItem } from '../SideDrawerMenu/SideDrawerMenu';
import TopNavbar from '../TopNavbar/TopNavbar';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  menuItems,
  profileData,
  children,
}) => {
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const [openNewRequestModal, setOpenNewRequestModal] = useState(false);
  return (
    <Layout>
      <TopNavbar />
      <SideDrawer
        collapsed={siderCollapsed}
        closeSider={() => setSiderCollapsed(true)}
        menuItems={menuItems}
        profileData={profileData}
      />
      {openNewRequestModal && (
        <NewRequestModal closeModal={() => setOpenNewRequestModal(false)} />
      )}
      <Layout.Content style={{ marginTop: '64px', marginBottom: '64px' }}>
        {children}
      </Layout.Content>
      <BottomNavbar
        openMenu={() => setSiderCollapsed(false)}
        openNewRequestModal={() => setOpenNewRequestModal(true)}
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
