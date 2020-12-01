import {
  LogoutOutlined,
  // MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { LoginLocation } from 'src/modules/login/constants';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import { SettingsLocation } from '../../modules/settings/constants';

const SideBottomMenu: React.FC<{
  closeDrawer: () => void;
  isLoggedIn: boolean;
  logoutHandler: Function;
}> = ({ closeDrawer, isLoggedIn, logoutHandler }) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <>
      <SideBottomMenuStyle>
        {isLoggedIn && (
          <SideBotomMenuItemStyle
            data-id="settings"
            onClick={() => history.push(SettingsLocation.path)}
          >
            <SettingOutlined />
            {t('menuDrawer.settings')}
          </SideBotomMenuItemStyle>
        )}
        {/* <SideBotomMenuItemStyle
          data-id="contactus"
          role="link"
          onClick={() => {
            closeDrawer();
            window.location.href = 'mailto:info@reach4help.org';
          }}
        >
          <MailOutlined />
          {t('menuDrawer.contactUs')}
        </SideBotomMenuItemStyle> */}
        {isLoggedIn && (
          <SideBotomMenuItemStyle
            data-id="logout"
            role="link"
            onClick={() => {
              closeDrawer();
              logoutHandler();
            }}
          >
            <LogoutOutlined />
            {t('menuDrawer.logout')}
          </SideBotomMenuItemStyle>
        )}

        <SideBotomMenuItemBtnStyle
          data-id="login-signup"
          role="link"
          onClick={() => history.push(LoginLocation.path)}
        >
          <LogInButton>Login</LogInButton>
        </SideBotomMenuItemBtnStyle>

        <SideBotomMenuItemBtnStyle
          data-id="login-signup"
          role="link"
          onClick={() => history.push(LoginLocation.path)}
        >
          <SignUpButton>Signup</SignUpButton>
        </SideBotomMenuItemBtnStyle>

        {/* {!isLoggedIn && (
          <SideBotomMenuItemStyle
            data-id="login-signup"
            role="link"
            onClick={() => {
              history.push(LoginLocation.path);
            }}
            // Signup and Login both route to /login. Where to route the two buttons in design separately?
          >
            {t('menuDrawer.login-signup')}
          </SideBotomMenuItemStyle>
        )} */}
      </SideBottomMenuStyle>
    </>
  );
};

const SideBotomMenuItemStyle = styled('div')`
  color: inherit;
  display: flex;
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
const SideBottomMenuStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  color: inherit;
  flex: 0.35;
  position: relative;
  bottom: 5%;
`;

const Button = styled.button`
  height: 35px;
  width: 90vw;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;
  position: relative;
  font-size: 18px;
  font-weight: 500;
`;

const LogInButton = styled(Button)`
  background: none;
  border: 1px solid ${COLORS.stepBackwardNormal};
  color: #eb7100;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid ${COLORS.brandOrange};
  }
`;

const SideBotomMenuItemBtnStyle = styled(SideBotomMenuItemStyle)`
  padding: 0;
  margin: 0;
`;

const SignUpButton = styled(Button)`
  border: none;
  color: ${COLORS.white};
  background: ${COLORS.stepBackwardNormal};
`;

export default SideBottomMenu;
