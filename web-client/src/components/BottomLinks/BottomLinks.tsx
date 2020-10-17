import {
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import { SettingsLocation } from '../../modules/settings/constants';

const BottomLinks: React.FC<IBottomLinksProps> = ({
  closeDrawer,
  isLoggedIn,
  logoutHandler,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <>
      <BottomLinksStyle>
        { isLoggedIn && (
        <BottomLinkItemStyle data-id="settings"
          onClick={() => history.push(SettingsLocation.path)}
        >
          <SettingOutlined />
          {t('menuDrawer.settings')}
        </BottomLinkItemStyle>)}
        <BottomLinkItemStyle
        data-id="contactus"
          role="link"
          onClick={() => {
            closeDrawer();
            window.location.href = 'mailto:info@reach4help.org';
          }}
        >
          <MailOutlined />
          {t('menuDrawer.contactUs')}
        </BottomLinkItemStyle>
        { isLoggedIn && ( <BottomLinkItemStyle
          data-id="logout"
          role="link"
          onClick={() => {
            closeDrawer();
            logoutHandler();
          }}
        >

          <LogoutOutlined />
            {t('menuDrawer.logout')}
          </BottomLinkItemStyle>)}
        { isLoggedIn && ( <BottomLinkItemStyle
          data-id="login-signup"
          role="link"
          onClick={() => {
            closeDrawer();
          }}
        >

          <LogoutOutlined />
            {t('menuDrawer.logout')}
          </BottomLinkItemStyle>)}
      </BottomLinksStyle>
    </>
  );
};

const BottomLinkItemStyle = styled('div')`
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
const BottomLinksStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  color: inherit;
`;

interface IBottomLinksProps {
  closeDrawer: () => void;
  isLoggedIn: boolean;
  logoutHandler: Function;
}

export default BottomLinks;
