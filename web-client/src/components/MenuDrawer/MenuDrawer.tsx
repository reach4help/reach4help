import {
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Drawer } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { User } from 'src/models/users';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import { SettingsLocation } from '../../modules/settings/constants';
import { InformationModal, makeLocalStorageKey } from '../Modals/OneTimeModal';
import SideDrawerMenu, { MenuItem } from '../SideDrawerMenu/SideDrawerMenu';
import SideDrawerProfile from '../SideDrawerProfile/SideDrawerProfile';

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  visible,
  closeDrawer,
  menuItems,
  profileData,
  logoutHandler,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

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
        <SideDrawerMenu items={menuItems || []} closeDrawer={closeDrawer} />
        <BottomLinks>
          <BottomLinkItem onClick={() => history.push(SettingsLocation.path)}>
            <SettingOutlined />
            {t('menuDrawer.settings')}
          </BottomLinkItem>
          <BottomLinkItem
            role="link"
            onClick={() => {
              closeDrawer();
              window.location.href = 'mailto:info@reach4help.org';
            }}
          >
            <MailOutlined />
            {t('menuDrawer.contactUs')}
          </BottomLinkItem>
          <BottomLinkItem
            role="link"
            onClick={() => {
              closeDrawer();
              logoutHandler();
            }}
          >
            <LogoutOutlined />
            {t('menuDrawer.logout')}
          </BottomLinkItem>
        </BottomLinks>
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

const BottomLinkItem = styled('div')`
  color: inherit;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  svg {
    margin-right: 10px;
  }
  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    color: white;
    font-weight: 700;
    background-color: ${COLORS.link};
  }
`;
const BottomLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  color: inherit;
`;

interface MenuDrawerProps {
  visible: boolean;
  closeDrawer: () => void;
  menuItems?: Array<MenuItem>;
  profileData?: User;
  logoutHandler: Function;
}

export default MenuDrawer;
