import {
  LogoutOutlined,
  MailOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Drawer } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { User } from 'src/models/users';
import styled from 'styled-components';

import SideDrawerMenu, { MenuItem } from '../SideDrawerMenu/SideDrawerMenu';
import SideDrawerProfile from '../SideDrawerProfile/SideDrawerProfile';

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  visible,
  closeDrawer,
  menuItems,
  profileData,
  logoutHandler,
  isCav,
  toggleApplicationPreference,
}) => {
  const { t } = useTranslation();

  return (
    <SideDrawer
      placement="left"
      closable
      onClose={closeDrawer}
      visible={visible}
      width="100%"
    >
      <SideDrawerProfile profileData={profileData} isCav={isCav} />
      <SideDrawerMenu
        items={menuItems || []}
        closeDrawer={closeDrawer}
        isCav={isCav}
      />
      <BottomLinks>
        <Link to={{ pathname: '/' }} onClick={closeDrawer}>
          <MailOutlined />
          {t('menuDrawer.contactUs')}
        </Link>
        <div onClick={() => toggleApplicationPreference()}>
          <UserSwitchOutlined />
          {`${
            isCav ? t('menuDrawer.switchToPIN') : t('menuDrawer.switchToCAV')
          }`}
        </div>
        <div
          onClick={() => {
            closeDrawer();
            logoutHandler();
          }}
        >
          <LogoutOutlined />
          {t('menuDrawer.logout')}
        </div>
      </BottomLinks>
    </SideDrawer>
  );
};

const SideDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  color: inherit;

  a,
  div {
    color: inherit;
    margin-bottom: 10px;
    padding: 0 10px;

    svg {
      margin-right: 10px;
    }
  }
`;

interface MenuDrawerProps {
  visible: boolean;
  closeDrawer: () => void;
  menuItems?: Array<MenuItem>;
  profileData?: User;
  logoutHandler: Function;
  isCav?: boolean;
  toggleApplicationPreference: Function;
}

export default MenuDrawer;
