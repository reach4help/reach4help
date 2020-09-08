import { Drawer } from 'antd';
import { firestore } from 'firebase';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setOffer } from 'src/ducks/offers/actions';
import { OffersState } from 'src/ducks/offers/types';
import { Offer } from 'src/models/offers';
import styled from 'styled-components';

import NotificationsHeader from './NotificationsHeader';
import NotificationsList from './NotificationsList';

const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  visible,
  closeDrawer,
  offersState,
  unseenOffers,
  unseenOffersKeys,
  isCav,
}) => {
  const dispatch = useDispatch();

  return (
    <SideDrawer
      placement="right"
      onClose={() => {
        if (visible) {
          for (const key of unseenOffersKeys) {
            if (offersState.data && offersState.data[key]) {
              const offer = offersState.data[key];
              offer.seenAt = firestore.Timestamp.now();
              dispatch(setOffer(offer, key, 'notificationsshouldnttrigger'));
            }
          }
        }
        closeDrawer();
      }}
      visible={visible}
      width="100%"
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
  .ant-drawer-close svg {
    color: red;
    width: 22px;
    height: 22px;
  }
`;

interface NotificationsDrawerProps {
  visible: boolean;
  closeDrawer: () => void;
  offersState: OffersState;
  unseenOffers: Offer[];
  unseenOffersKeys: string[];
  isCav?: boolean;
}

export default NotificationsDrawer;
