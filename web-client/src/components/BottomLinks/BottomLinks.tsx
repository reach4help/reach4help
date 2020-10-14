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

// import { MenuItem } from 'src/types/module';

// import {
//   AcceptedRequestsLocation,
//   OpenRequestsLocation,
// } from 'src/modules/requests/constants';

// const menuItems2: Array<MenuItem> = [
//   {
//     id: '1',
//     title: 'Find Requests',
//     showWhenLogggedOn: true,
//     showWhenNotLogggedOn: false,
//     children: [
//       {
//         id: '1.1',
//         title: 'Open',
//         location: OpenRequestsLocation,
//       },
//       {
//         id: '1.2',
//         title: 'Accepted',
//         location: AcceptedRequestsLocation,
//       },
//     ]},
//     {
//       id: '2',
//       title: 'My Requests',
//       showWhenLogggedOn: true,
//       showWhenNotLogggedOn: false,
//     },
//     {
//       id: '3',
//       title: 'My Offers',
//       showWhenLogggedOn: true,
//       showWhenNotLogggedOn: false,
//     },
//     {
//       id: '6',
//       title: 'Create Request',
//       showWhenLogggedOn: true,
//       showWhenNotLogggedOn: true,
//     },
//     {
//       id: '7',
//       title: 'Log In',
//       showWhenLogggedOn: false,
//       showWhenNotLogggedOn: true,
//     },
//     {
//       id: '8',
//       title: 'Sign Up',
//       showWhenLogggedOn: false,
//       showWhenNotLogggedOn: true,
//     },
//     {
//       id: '9',
//       title: 'Log Out',
//       showWhenLogggedOn: true,
//       showWhenNotLogggedOn: false,
//     },
// ];

const BottomLinks: React.FC<IBottomLinksProps> = ({
  closeDrawer,
  logoutHandler,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <>
      <BottomLinksStyle>
        <BottomLinkItemStyle
          onClick={() => history.push(SettingsLocation.path)}
        >
          <SettingOutlined />
          {t('menuDrawer.settings')}
        </BottomLinkItemStyle>
        <BottomLinkItemStyle
          role="link"
          onClick={() => {
            closeDrawer();
            window.location.href = 'mailto:info@reach4help.org';
          }}
        >
          <MailOutlined />
          {t('menuDrawer.contactUs')}
        </BottomLinkItemStyle>
        <BottomLinkItemStyle
          role="link"
          onClick={() => {
            closeDrawer();
            logoutHandler();
          }}
        >
          <LogoutOutlined />
          {t('menuDrawer.logout')}
        </BottomLinkItemStyle>
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
