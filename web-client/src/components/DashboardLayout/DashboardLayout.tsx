import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { OffersState } from 'src/ducks/offers/types';
import { Offer, OfferStatus } from 'src/models/offers';
import { User } from 'src/models/users';
import styled from 'styled-components';

import MenuDrawer from '../MenuDrawer/MenuDrawer';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer';
import { MenuItem } from '../SideDrawerMenu/SideDrawerMenu';
import TopNavbar from '../TopNavbar/TopNavbar';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  menuItems,
  profileData,
  children,
  isCav,
  offersState,
  logoutHandler,
  toggleApplicationPreference,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [unseenOffers, setUnseenOffers] = useState<Offer[]>([]);
  const [unseenOffersKeys, setUnseenOffersKeys] = useState<string[]>([]);

  useEffect(() => {
    const unseenOffersLocal: Offer[] = [];
    const unseenOffersKeysLocal: string[] = [];
    if (offersState.data) {
      for (const offersKey in offersState.data) {
        if (
          offersState.data[offersKey] &&
          !offersState.data[offersKey].seenAt &&
          ((!isCav &&
            (offersState.data[offersKey].status === OfferStatus.pending ||
              offersState.data[offersKey].status ===
                OfferStatus.cavDeclined)) ||
            (isCav &&
              (offersState.data[offersKey].status === OfferStatus.rejected ||
                offersState.data[offersKey].status === OfferStatus.accepted)))
        ) {
          unseenOffersLocal.push(offersState.data[offersKey]);
          unseenOffersKeysLocal.push(offersKey);
        }
      }
      unseenOffersLocal.sort(
        (a, b) => b.updatedAt.toMillis() - a.updatedAt.toMillis(),
      );
      setUnseenOffers(unseenOffersLocal);
      setUnseenOffersKeys(unseenOffersKeysLocal);
    }
  }, [offersState, setUnseenOffersKeys, setUnseenOffers, isCav]);

  return (
    <DashboardLayoutWrapper>
      <TopNavbar
        visible={!menuVisible && !notificationVisible}
        openMenu={() => setMenuVisible(true)}
        openNotifications={() => setNotificationVisible(true)}
        isCav={isCav}
        unseenOffersCount={unseenOffers.length}
      />
      <MenuDrawer
        visible={menuVisible}
        closeDrawer={() => setMenuVisible(false)}
        menuItems={menuItems}
        profileData={profileData}
        logoutHandler={logoutHandler}
        isCav={isCav}
        toggleApplicationPreference={toggleApplicationPreference}
      />
      <NotificationsDrawer
        visible={notificationVisible}
        offersState={offersState}
        unseenOffers={unseenOffers}
        unseenOffersKeys={unseenOffersKeys}
        closeDrawer={() => setNotificationVisible(false)}
        isCav={isCav}
      />
      <DashboardContent>{children}</DashboardContent>
    </DashboardLayoutWrapper>
  );
};

const DashboardLayoutWrapper = styled(Layout)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow: auto;
`;

const DashboardContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  margin: 64px 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

interface DashboardLayoutProps {
  menuItems?: Array<MenuItem>;
  profileData?: User;
  children?: React.ReactNode;
  isCav?: boolean;
  logoutHandler: Function;
  offersState: OffersState;
  toggleApplicationPreference: Function;
}

export default DashboardLayout;
