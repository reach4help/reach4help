import { Drawer } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'src/models/users';
import {
  AcceptedRequestsLocation,
  OpenRequestsLocation,
} from 'src/modules/requests/constants';
import { MenuItem } from 'src/types/module';
import styled from 'styled-components';

import BottomLinks from '../BottomLinks/BottomLinks';
import { InformationModal, makeLocalStorageKey } from '../Modals/OneTimeModal';
import SideDrawerMenu from '../SideDrawerMenu/SideDrawerMenu';
import SideDrawerProfile from '../SideDrawerProfile/SideDrawerProfile';

const menuItems: Array<MenuItem> = [
  {
    id: '1',
    title: 'Find Requests',
    showWhenLogggedOn: true,
    showWhenNotLogggedOn: false,
    children: [
      {
        id: '1.1',
        title: 'Open',
        location: OpenRequestsLocation,
      },
      {
        id: '1.2',
        title: 'Accepted',
        location: AcceptedRequestsLocation,
      },
    ],
  },
  {
    id: '2',
    title: 'My Requests',
    showWhenLogggedOn: true,
    showWhenNotLogggedOn: false,
  },
  {
    id: '3',
    title: 'My Offers',
    showWhenLogggedOn: true,
    showWhenNotLogggedOn: false,
  },
  {
    id: '6',
    title: 'Create Request',
    showWhenLogggedOn: true,
    showWhenNotLogggedOn: true,
  },
  {
    id: '7',
    title: 'Log In',
    showWhenLogggedOn: false,
    showWhenNotLogggedOn: true,
  },
  {
    id: '8',
    title: 'Sign Up',
    showWhenLogggedOn: false,
    showWhenNotLogggedOn: true,
  },
  {
    id: '9',
    title: 'Log Out',
    showWhenLogggedOn: true,
    showWhenNotLogggedOn: false,
  },
];

const generateFinalList = (profileData?: User) => {
  const isLoggedIn = profileData && profileData.displayName;
  if (isLoggedIn) {
    return menuItems.filter(item => item.showWhenLogggedOn);
  }
  return menuItems.filter(item => item.showWhenNotLogggedOn);
};

const MenuDrawer: React.FC<IMenuDrawerProps> = ({
  visible,
  closeDrawer,
  profileData,
  logoutHandler,
}) => {
  const { t } = useTranslation();

  const instructions = [
    t('information_modal.MenuDrawer.0'),
    t('information_modal.MenuDrawer.1'),
    t('information_modal.MenuDrawer.2'),
    t('information_modal.MenuDrawer.3'),
    t('information_modal.MenuDrawer.4'),
    t('information_modal.MenuDrawer.5'),
    t('information_modal.MenuDrawer.6'),
  ];
  const instructionModalLocalStorageKey = makeLocalStorageKey({
    prefix: 'reach4help.modalSeen.MenuDrawer',
    /* TODO:  get unique user id */
    userid: null,
  });

  return (
    <>
      <SideDrawer
        placement="left"
        closable
        onClose={closeDrawer}
        visible={visible}
        width="100%"
      >
        <SideDrawerProfile profileData={profileData} />
        <SideDrawerMenu
          items={generateFinalList(profileData)}
          closeDrawer={closeDrawer}
        />
        <BottomLinks
          logoutHandler={logoutHandler}
          isLoggedIn={false}
          closeDrawer={closeDrawer}
        />
      </SideDrawer>
      <InformationModal
        title={t('information_modal.MenuDrawer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

const SideDrawer = styled(Drawer)`
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

export default MenuDrawer;
