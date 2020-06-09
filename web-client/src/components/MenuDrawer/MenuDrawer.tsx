import {
  LogoutOutlined,
  MailOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Drawer } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'src/models/users';
import { COLORS } from 'src/theme/colors';
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
        <BottomLinkItem
          isCav={isCav}
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
          isCav={isCav}
          role="link"
          onClick={() => toggleApplicationPreference()}
        >
          <UserSwitchOutlined />
          {`${
            isCav ? t('menuDrawer.switchToPIN') : t('menuDrawer.switchToCAV')
          }`}
        </BottomLinkItem>
        <BottomLinkItem
          isCav={isCav}
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

const BottomLinkItem = styled('div')<{ isCav?: boolean }>`
  color: inherit;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  svg {
    margin-right: 10px;
  }
  &:hover {
    color: white;
    font-weight: 700;
    background-color: ${props =>
      props.isCav ? COLORS.link : COLORS.brandOrange};
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
  isCav?: boolean;
  toggleApplicationPreference: Function;
}

export default MenuDrawer;
