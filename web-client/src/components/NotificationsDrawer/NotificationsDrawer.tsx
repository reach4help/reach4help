import { Drawer } from 'antd';
import React from 'react';
import styled from 'styled-components';

import NotificationsHeader from './NotificationsHeader';
import NotificationsList from './NotificationsList';

const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  visible,
  closeDrawer,
}) => (
  <SideDrawer
    placement="right"
    onClose={() => {
      // TODO: Logic to be handled in getstream service
      closeDrawer();
    }}
    visible={visible}
    width="100%"
  >
    <NotificationsHeader numNotifications={0} />
    <NotificationsList unseenOffers={[]} />
  </SideDrawer>
);

const SideDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 10px;
    background: #f8f8f8;
  }
  .ant-drawer-close svg {
    color: red;
    width: 22px;
    height: 22px;
  }
`;

interface NotificationsDrawerProps {
  visible: boolean;
  closeDrawer: () => void;
}

export default NotificationsDrawer;
