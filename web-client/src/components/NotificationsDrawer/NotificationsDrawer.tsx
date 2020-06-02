import { Drawer } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOffer } from 'src/ducks/offers/actions';
import { OffersState } from 'src/ducks/offers/types';
import { Offer } from 'src/models/offers';
import styled from 'styled-components';

import NotificationsHeader from './NotificationsHeader';
import NotificationsList from './NotificationsList';

const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  visible,
  closeDrawer,
  isCav,
}) => {
  const dispatch = useDispatch();
  const offersState = useSelector(
    ({ offers }: { offers: OffersState }) => offers,
  );

  const unseenOffers: Offer[] = [];
  const unseenOffersKeys: string[] = [];
  if (offersState.data) {
    for (const offersKey in offersState.data) {
      if (offersState.data[offersKey] && !offersState.data[offersKey].seenAt) {
        unseenOffers.push(offersState.data[offersKey]);
        unseenOffersKeys.push(offersKey);
      }
    }
  }
  unseenOffers.sort((a, b) => b.updatedAt.toMillis() - a.updatedAt.toMillis());

  useEffect(() => {
    if (visible) {
      const cleanupSeenOffers: Function[] = [];
      for (const key of unseenOffersKeys) {
        cleanupSeenOffers.push(() => {
          if (offersState.data) {
            dispatch(setOffer(offersState.data[key], key));
          }
        });
      }
      return () => {
        for (const cleanupOffer of cleanupSeenOffers) {
          cleanupOffer();
        }
      };
    }
  }, [visible, dispatch, offersState, unseenOffersKeys]);

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
        numNotifications={unseenOffers.length}
      />
      <NotificationsList isCav={isCav} unseenOffers={unseenOffers} />
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
