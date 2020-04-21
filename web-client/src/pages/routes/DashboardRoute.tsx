import { Layout } from 'antd';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import SideNavMenu from 'src/components/SideNavMenu/SideNavMenu';
import { MenuItem } from 'src/types/menu-item';

const { Header, Content, Sider } = Layout;

interface DashboardRouteProps extends RouteProps {
  menuLinks?: Array<MenuItem>;
}

const DashboardRoute: React.FC<DashboardRouteProps> = ({
  path,
  component,
  menuLinks,
}) => (
  <Layout>
    <Header />
    <Layout>
      <Sider style={{ height: '100%' }}>
        {/* TODO remove `|| []` when menulinks are typed required in dashboard modules */}
        <SideNavMenu items={menuLinks || []} />
      </Sider>
      <Content>
        <Route path={path} component={component} />
      </Content>
    </Layout>
  </Layout>
);

export default DashboardRoute;
