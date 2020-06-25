import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const NotificationsHeader: React.FC<NotificationsHeaderProps> = ({
  numNotifications = 0,
  isCav,
}): React.ReactElement => {
  const { t } = useTranslation();

  const NotificationHeaderWrapper = styled.div`
    margin: 25px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    font-family: Roboto, sans-serif;
  `;

  const Header2 = styled.h2`
    background-color: ${isCav ? COLORS.primaryDark : COLORS.brandOrange};
    color: #ffffff;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 10px;
    margin-bottom: 17px;
    border-radius: 5px;
  `;

  const Header1 = styled.h1`
    color: rgba(0, 0, 0, 0.65);
    font-size: 30px;
  `;

  return (
    <NotificationHeaderWrapper>
      <Header1>
        <b> {t('components.notification.notifications')} </b>
      </Header1>
      <Header2>{numNotifications}</Header2>
    </NotificationHeaderWrapper>
  );
};

interface NotificationsHeaderProps {
  numNotifications?: number;
  isCav?: boolean;
}

export default NotificationsHeader;
