import { Drawer } from 'antd';
import React from 'react';
import { User } from 'src/models/users/User';
import styled from 'styled-components';

import SideBottomMenu from '../SideBottomMenu/SideBottomMenu';
// import SideDrawerProfile from '../SideDrawerProfile/SideDrawerProfile';
import SideTopMenu from '../SideTopMenu/SideTopMenu';

const MenuDrawer: React.FC<IMenuDrawerProps> = ({
  visible,
  closeDrawer,
  profileData,
  logoutHandler,
}) => {
  const isLoggedIn = !!(profileData && profileData.displayNickname);

  // Closes SideDrawer if user switches from mobile view
  window.onresize = closeDrawer;
  return (
    <>
      <SideDrawer
        placement="left"
        closable
        onClose={closeDrawer}
        visible={visible}
        width="100%"
      >
        {/* <SideDrawerProfile profileData={profileData} /> */}
        <SideTopMenu closeDrawer={closeDrawer} isLoggedIn={isLoggedIn} />
        <Line />
        <SideBottomMenu
          logoutHandler={logoutHandler}
          isLoggedIn={isLoggedIn}
          closeDrawer={closeDrawer}
        />
      </SideDrawer>
    </>
  );
};

const SideDrawer = styled(Drawer)`
  z-index: 10;

  .ant-drawer-body {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .ant-drawer-close svg {
    color: red;
    width: 22px;
    height: 22px;
  }
`;

interface IMenuDrawerProps {
  visible: boolean;
  closeDrawer: () => void;
  profileData?: User;
  logoutHandler: Function;
}

const Line = styled.div`
  background: #c4c4c4;
  height: 1px;
  width: 90%;
  position: relative;
  left: 5%;
  bottom: 7.5%;
`;

export default MenuDrawer;
