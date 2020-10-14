import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { observeOffers } from 'src/ducks/offers/actions';
import { OffersState } from 'src/ducks/offers/types';
import { ProfileState } from 'src/ducks/profile/types';
import { Offer } from 'src/models/offers';
import styled from 'styled-components';

import MenuDrawer from '../MenuDrawer/MenuDrawer';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer';
import TopNavbar from '../TopNavbar/TopNavbar';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  // children is a ReactProp which is the children of the element that calls this component
  children,
  logoutHandler,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [unseenOffers, setUnseenOffers] = useState<Offer[]>([]);
  const [unseenOffersKeys, setUnseenOffersKeys] = useState<string[]>([]);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const offersState = useSelector(
    ({ offers }: { offers: OffersState }) => offers,
  );
  const userProfile = profileState.profile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      profileState.profile &&
      profileState.profile.applicationPreference &&
      !offersState.data &&
      !offersState.loading
    ) {
      observeOffers(dispatch, {
        userType: profileState.profile.applicationPreference,
        userRef: profileState.userRef,
      });
    }
  }, [userProfile, profileState, offersState, dispatch]);

  useEffect(() => {
    const unseenOffersLocal: Offer[] = [];
    const unseenOffersKeysLocal: string[] = [];
    if (offersState.data) {
      // TODO: Replace below with logic without user roles
      // for (const offersKey in offersState.data) {
      //   if (
      //     offersState.data[offersKey] &&
      //     !offersState.data[offersKey].seenAt &&
      //     ((!isCav &&
      //       (offersState.data[offersKey].status === OfferStatus.pending ||
      //         offersState.data[offersKey].status ===
      //           OfferStatus.cavDeclined)) ||
      //       (isCav &&
      //         (offersState.data[offersKey].status === OfferStatus.rejected ||
      //           offersState.data[offersKey].status === OfferStatus.accepted)))
      //   ) {
      //     unseenOffersLocal.push(offersState.data[offersKey]);
      //     unseenOffersKeysLocal.push(offersKey);
      //   }
      // }
      unseenOffersLocal.sort(
        (a, b) => b.updatedAt.toMillis() - a.updatedAt.toMillis(),
      );
      setUnseenOffers(unseenOffersLocal);
      setUnseenOffersKeys(unseenOffersKeysLocal);
    }
  }, [offersState, setUnseenOffersKeys, setUnseenOffers]);

  return (
    <DashboardLayoutWrapper>
      <TopNavbar
        visible={!menuVisible && !notificationVisible}
        openMenu={() => setMenuVisible(true)}
        openNotifications={() => setNotificationVisible(true)}
        unseenOffersCount={unseenOffers.length}
      />
      <MenuDrawer
        visible={menuVisible}
        closeDrawer={() => setMenuVisible(false)}
        profileData={userProfile}
        logoutHandler={logoutHandler}
      />
      <NotificationsDrawer
        visible={notificationVisible}
        offersState={offersState}
        unseenOffers={unseenOffers}
        unseenOffersKeys={unseenOffersKeys}
        closeDrawer={() => setNotificationVisible(false)}
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
  position: relative;
  top: 64px;
  overflow-x: hidden;
  overflow-y: hidden;
`;

interface DashboardLayoutProps {
  children?: React.ReactNode;
  logoutHandler: Function;
}

export default DashboardLayout;
