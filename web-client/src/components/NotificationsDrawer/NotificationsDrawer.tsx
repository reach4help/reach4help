import { Drawer } from 'antd';
import React from 'react';
import styled from 'styled-components';

const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  visible,
  closeDrawer,
}) => (
  <SideDrawer
    placement="right"
    closable
    onClose={closeDrawer}
    visible={visible}
    width="100%"
  >
    <h3>Notifications</h3>
  </SideDrawer>
);

const SideDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }
`;

interface NotificationsDrawerProps {
  visible: boolean;
  closeDrawer: () => void;
}

export default NotificationsDrawer;
