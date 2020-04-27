import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { MenuItem } from 'src/types/menu-item';

import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';

interface DashboardRouteProps extends RouteProps {
  menuLinks?: Array<MenuItem>;
}

const DashboardRoute: React.FC<DashboardRouteProps> = ({
  path,
  component,
  menuLinks,
}) => (
  <DashboardLayout menuLinks={menuLinks || []}>
    <Route path={path} component={component} />
  </DashboardLayout>
);

export default DashboardRoute;
