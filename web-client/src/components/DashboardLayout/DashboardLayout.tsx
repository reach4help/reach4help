import { Layout } from 'antd';
<<<<<<< HEAD
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DEVICE_MAX } from 'src/constants/mediaQueries';
=======
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEVICE_MAX } from 'src/constants/mediaQueries';
import { observeOffers } from 'src/ducks/offers/actions';
import { OffersState } from 'src/ducks/offers/types';
>>>>>>> 4672aafc... feat: added missing import statement
import { ProfileState } from 'src/ducks/profile/types';
import styled from 'styled-components';

import BottomNavbar from '../BottomNavbar/BottomNavbar';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import TopNavbar from '../TopNavbar/TopNavbar';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  logoutHandler,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const userProfile = profileState.profile;

  return (
    <DashboardLayoutWrapper>
      <TopNavbar
        visible={!menuVisible}
        toggleMenu={() => setMenuVisible(!menuVisible)}
        unseenOffersCount={0}
      />
      <MenuDrawer
        visible={menuVisible}
        closeDrawer={() => setMenuVisible(false)}
        profileData={userProfile}
        logoutHandler={logoutHandler}
      />
      {/* TODO: Replace with getstream */}

      <DashboardContent>{children}</DashboardContent>
      <BottomNavbar
        visible={!menuVisible}
        openMenu={() => setMenuVisible(true)}
        unseenOffersCount={0}
      />
    </DashboardLayoutWrapper>
  );
};

const DashboardLayoutWrapper = styled.div``;

const DashboardContent = styled(Layout.Content)`
  position: relative;
  padding-top: 64px;

  @media ${DEVICE_MAX.tablet} {
    padding-bottom: 64px;
  }
  overflow-x: hidden;
  overflow-y: hidden;
`;

interface DashboardLayoutProps {
  children?: React.ReactNode;
  logoutHandler: Function;
}

export default DashboardLayout;
