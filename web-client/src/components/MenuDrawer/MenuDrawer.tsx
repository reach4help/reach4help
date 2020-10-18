import { Drawer } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'src/models/users';
import styled from 'styled-components';

import { InformationModal, makeLocalStorageKey } from '../Modals/OneTimeModal';
import SideBottomMenu from '../SideBottomMenu/SideBottomMenu';
import SideDrawerProfile from '../SideDrawerProfile/SideDrawerProfile';
import SideTopMenu from '../SideTopMenu/SideTopMenu';

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
  const isLoggedIn = !!(profileData && profileData.displayName);

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
        <SideTopMenu closeDrawer={closeDrawer} isLoggedIn={isLoggedIn} />
        <SideBottomMenu
          logoutHandler={logoutHandler}
          isLoggedIn={isLoggedIn}
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
