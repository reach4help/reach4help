import { Layout } from 'antd';
import React, { useState } from 'react';
import { MenuItem } from 'src/types/menu-item';

import BottomNavbar from '../BottomNavbar/BottomNavbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import TopNavbar from '../TopNavbar/TopNavbar';

interface DashboardLayoutProps {
  menuLinks: Array<MenuItem>;
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  menuLinks,
  children,
}) => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  return (
    <Layout>
      <TopNavbar />
      <SideDrawer
        collapsed={siderCollapsed}
        menuLinks={menuLinks}
        closeHandler={() => setSiderCollapsed(true)}
      />
      <Layout.Content style={{ marginTop: '64px', marginBottom: '64px' }}>
        {children}
      </Layout.Content>
      <BottomNavbar menuOnClick={() => setSiderCollapsed(false)} />
    </Layout>
  );
};

export default DashboardLayout;
