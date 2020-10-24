import {
  GlobalOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import CONSTANTS from 'src/constants';
import { LoginLocation } from 'src/modules/login/constants';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import { SettingsLocation } from '../../modules/settings/constants';

const { LANGUAGE_PREFERENCE_LOCALSTORAGE_KEY } = CONSTANTS;

const { Option } = Select;

const SideBottomMenu: React.FC<{
  closeDrawer: () => void;
  isLoggedIn: boolean;
  logoutHandler: Function;
}> = ({ closeDrawer, isLoggedIn, logoutHandler }) => {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  let { language: currentLanguage } = i18n;

  currentLanguage = currentLanguage.substr(0, 2);

  const setBrowserDefaultLanguage = val => {
    localStorage.setItem(LANGUAGE_PREFERENCE_LOCALSTORAGE_KEY, val);
    i18n.changeLanguage(val);
  };

  return (
    <>
      <SideBottomMenuStyle>
        <SideBotomMenuItemStyle onClick={() => setBrowserDefaultLanguage}>
          <GlobalOutlined />
          {t('menuDrawer.changeLanguage')}
          <Select
            defaultValue={currentLanguage}
            showSearch
            style={{
              margin: 'auto',
              marginTop: '20px',
              width: '100%',
            }}
            size="large"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.children?.toLowerCase().indexOf(input.toLowerCase()) >=
              // eslint-disable-next-line react/jsx-indent
              0
            }
            onChange={v => setBrowserDefaultLanguage(v.toString())}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */
            allLanguages.map(language => (
              <Option key={language['1']} value={language['1']}>
                {language.local}
              </Option>
            ))}
          </Select>
        </SideBotomMenuItemStyle>
        {isLoggedIn && (
          <SideBotomMenuItemStyle
            data-id="settings"
            onClick={() => history.push(SettingsLocation.path)}
          >
            <SettingOutlined />
            {t('menuDrawer.settings')}
          </SideBotomMenuItemStyle>
        )}
        <SideBotomMenuItemStyle
          data-id="contactus"
          role="link"
          onClick={() => {
            closeDrawer();
            window.location.href = 'mailto:info@reach4help.org';
          }}
        >
          <MailOutlined />
          {t('menuDrawer.contactUs')}
        </SideBotomMenuItemStyle>
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
        {!isLoggedIn && (
          <SideBotomMenuItemStyle
            data-id="login-signup"
            role="link"
            onClick={() => {
              history.push(LoginLocation.path);
            }}
          >
            {t('menuDrawer.login-signup')}
          </SideBotomMenuItemStyle>
        )}
      </SideBottomMenuStyle>
    </>
  );
};

const allLanguages = [
  {
    '1': 'en',
    '2': 'eng',
    '3': 'eng',
    name: 'English',
    local: 'English',
    '2T': 'eng',
    '2B': 'eng',
  },
  {
    '1': 'fr',
    '2': 'fra',
    '3': 'fra',
    name: 'French',
    local: 'Français',
    '2T': 'fra',
    '2B': 'fre',
  },
  {
    '1': 'pt',
    '2': 'por',
    '3': 'por',
    name: 'Portuguese',
    local: 'Português',
    '2T': 'por',
    '2B': 'por',
  },
  {
    '1': 'es',
    '2': 'spa',
    '3': 'spa',
    name: 'Spanish',
    local: 'Español',
    '2T': 'spa',
    '2B': 'spa',
  },
];

const SideBotomMenuItemStyle = styled('div')`
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
const SideBottomMenuStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  color: inherit;
`;

export default SideBottomMenu;
