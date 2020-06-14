import React from 'react';
import { useTranslation } from 'react-i18next';
import { Offer } from 'src/models/offers';
import styled from 'styled-components';

import Notification from './Notification';

interface NotificationsList {
  isCav?: boolean;
  unseenOffers: Offer[];
}

const NotificationListContainer = styled.div`
  margin-left: 15px,
  margin-right: 15px,
  color: rgba(0, 0, 0, 0.65),
  font-family: Roboto, sans-serif,
`;

const NotificationsList: React.FC<NotificationsList> = ({
  isCav,
  unseenOffers,
}): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <NotificationListContainer>
      {unseenOffers.length > 0 &&
        unseenOffers.map((item, index) => (
          <Notification
            key={index}
            cavUser={item.cavUserSnapshot}
            offerStatus={item.status}
            offerRequest={item.requestSnapshot}
            requestRef={item.requestRef}
            updatedAt={item.updatedAt.toDate()}
            isCav={isCav}
          />
        ))}
      {unseenOffers.length === 0 && (
        <div style={{ textAlign: 'center' }}>
          <p>{t('components.notification.no_notifications')}</p>
        </div>
      )}
    </NotificationListContainer>
  );
};
export default NotificationsList;
