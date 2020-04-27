import { Layout } from 'antd';
import React, { useState } from 'react';
import { MenuItem } from 'src/types/menu-item';

import BottomNavbar from '../BottomNavbar/BottomNavbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import TopNavbar from '../TopNavbar/TopNavbar';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  menuItems,
  profileData,
  siteLocations,
  children,
}) => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  return (
    <Layout>
      <TopNavbar />
      <SideDrawer
        collapsed={siderCollapsed}
        closeSider={() => setSiderCollapsed(true)}
        menuItems={menuItems}
        profileData={profileData}
        siteLocations={siteLocations}
      />
      <Layout.Content style={{ marginTop: '64px', marginBottom: '64px' }}>
        {children}
      </Layout.Content>
      <BottomNavbar
        openSider={() => setSiderCollapsed(false)}
        siteLocations={siteLocations}
      />
    </Layout>
  );
};

interface DashboardLayoutProps {
  menuItems: Array<MenuItem>;
  profileData: {
    fullName: string;
    photoUrl: string;
    followers: number;
    stars: number;
  };
  siteLocations: any;
  children?: React.ReactNode;
}

export default DashboardLayout;
