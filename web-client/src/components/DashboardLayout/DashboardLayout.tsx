import { CloseOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { MenuItem } from 'src/types/menu-item';
import styled from 'styled-components';

import BottomNavbar from '../BottomNavbar/BottomNavbar';
import SideNavMenu from '../SideNavMenu/SideNavMenu';
import TopNavbar from '../TopNavbar/TopNavbar';

interface DashboardLayoutProps {
  menuLinks: Array<MenuItem>;
  children?: React.ReactNode;
}

const CloseButton = styled.button`
  float: right;
  right: 0;
  padding: 15px;
`;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  menuLinks,
  children,
}) => {
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  return (
    <Layout>
      <TopNavbar />
      <Layout.Sider collapsed={siderCollapsed} theme="light">
        <CloseButton onClick={() => setSiderCollapsed(true)}>
          <CloseOutlined />
        </CloseButton>
        <SideNavMenu items={menuLinks || []} />
      </Layout.Sider>
      <Layout.Content style={{ marginTop: '64px', marginBottom: '64px' }}>
        {children}
      </Layout.Content>
      <BottomNavbar menuOnClick={() => setSiderCollapsed(false)} />
    </Layout>
  );
};

export default DashboardLayout;
