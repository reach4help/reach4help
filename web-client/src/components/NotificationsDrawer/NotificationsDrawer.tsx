import { Drawer } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { OffersState } from 'src/ducks/offers/types';
import styled from 'styled-components';

import NotificationsHeader from './NotificationsHeader';
import NotificationsList from './NotificationsList';

const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  visible,
  closeDrawer,
  isCav,
}) => {
  const offersState = useSelector(
    ({ offers }: { offers: OffersState }) => offers,
  );

  const seenOffersActivity: any = [];
  if (offersState.data) {
    for (const offersKey in offersState.data) {
      if (offersState.data[offersKey] && offersState.data[offersKey].seenAt) {
        seenOffersActivity.push(offersState.data[offersKey]);
      }
    }
  }
  seenOffersActivity.sort((a, b) => b.seenAt - a.seenAt);

  return (
    <SideDrawer
      placement="right"
      onClose={closeDrawer}
      visible={visible}
      width="100%"
      style={{ marginTop: '64px', height: 'calc(100vh - 128px)' }}
    >
      <NotificationsHeader
        isCav={isCav}
        numSeenOffers={seenOffersActivity.length}
      />
      <NotificationsList isCav={isCav} seenOffers={seenOffersActivity} />
    </SideDrawer>
  );
};

const SideDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 10px;
    background: #f8f8f8;
  }
`;

interface NotificationsDrawerProps {
  visible: boolean;
  closeDrawer: () => void;
  isCav?: boolean;
}

export default NotificationsDrawer;
