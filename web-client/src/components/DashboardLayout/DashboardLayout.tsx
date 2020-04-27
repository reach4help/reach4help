import { Layout } from 'antd';
import React from 'react';
import { MenuItem } from 'src/types/menu-item';

import SideNavMenu from '../SideNavMenu/SideNavMenu';

interface DashboardLayoutProps {
  menuLinks: Array<MenuItem>;
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  menuLinks,
  children,
}) => {
  const { Header, Sider, Content } = Layout;
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider style={{ height: '100%' }}>
          {/* TODO remove `|| []` when menulinks are typed required in dashboard modules */}
          <SideNavMenu items={menuLinks || []} />
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
