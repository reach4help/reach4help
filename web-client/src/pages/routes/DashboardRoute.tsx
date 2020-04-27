import React from 'react';
import Location from 'react-app-location';
import { Route, RouteProps } from 'react-router-dom';
import { MenuItem } from 'src/types/menu-item';

import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';

// TODO remove when using real profile state
const mockProfileData = {
  fullName: 'John Watkins',
  photoUrl:
    'https://lh3.googleusercontent.com/-6DkdLho7c5Y/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckYv30Z33APqrrucaWdEBbadI7WxQ/photo.jpg?sz=46',
  followers: 15,
  stars: 4.5,
};

// TODO change locations
const siteLocations = {
  logout: new Location('/requests/logout'),
  contact: new Location('/requests/contact'),
  map: new Location('/requests/map'),
  notifications: new Location('requests/notifications'),
};

const DashboardRoute: React.FC<DashboardRouteProps> = ({
  path,
  component,
  menuItems,
}) => (
  <DashboardLayout
    menuItems={menuItems}
    profileData={mockProfileData}
    siteLocations={siteLocations}
  >
    <Route path={path} component={component} />
  </DashboardLayout>
);

interface DashboardRouteProps extends RouteProps {
  menuItems: Array<MenuItem>;
}

export default DashboardRoute;
