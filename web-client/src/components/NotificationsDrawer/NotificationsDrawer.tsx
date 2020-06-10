import { Drawer } from 'antd';
import { firestore } from 'firebase';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setOffer } from 'src/ducks/offers/actions';
import { OffersState } from 'src/ducks/offers/types';
import { Offer, OfferStatus } from 'src/models/offers';
import styled from 'styled-components';

import NotificationsHeader from './NotificationsHeader';
import NotificationsList from './NotificationsList';

const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  visible,
  closeDrawer,
  offersState,
  isCav,
}) => {
  const dispatch = useDispatch();

  const unseenOffers: Offer[] = [];
  const unseenOffersKeys: string[] = [];
  if (offersState.data) {
    for (const offersKey in offersState.data) {
      if (
        offersState.data[offersKey] &&
        !offersState.data[offersKey].seenAt &&
        ((isCav &&
          offersState.data[offersKey].status !== OfferStatus.pending &&
          offersState.data[offersKey].status !== OfferStatus.cavDeclined) ||
          (!isCav &&
            (offersState.data[offersKey].status === OfferStatus.rejected ||
              offersState.data[offersKey].status === OfferStatus.accepted)))
      ) {
        unseenOffers.push(offersState.data[offersKey]);
        unseenOffersKeys.push(offersKey);
      }
    }
  }
  unseenOffers.sort((a, b) => b.updatedAt.toMillis() - a.updatedAt.toMillis());

  return (
    <SideDrawer
      placement="right"
      onClose={() => {
        if (visible) {
          for (const key of unseenOffersKeys) {
            if (offersState.data && offersState.data[key]) {
              const offer = offersState.data[key];
              offer.seenAt = firestore.Timestamp.now();
              dispatch(setOffer(offer, key));
            }
          }
        }
        closeDrawer();
      }}
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
  isCav?: boolean;
}

export default NotificationsDrawer;
