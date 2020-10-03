import React from 'react';
import { useTranslation } from 'react-i18next';
import { Offer } from 'src/models/offers';
import styled from 'styled-components';

import Notification from './Notification';

const NotificationsList: React.FC<NotificationsList> = ({
  unseenOffers,
}): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <NotificationListWrapper>
      {unseenOffers.length > 0 &&
        unseenOffers.map((item, index) => (
          <Notification
            key={index}
            cavUser={item.cavUserSnapshot}
            offerStatus={item.status}
            offerRequest={item.requestSnapshot}
            requestRef={item.requestRef}
            updatedAt={item.updatedAt.toDate()}
          />
        ))}
      {unseenOffers.length === 0 && (
        <div style={{ textAlign: 'center' }}>
          <p>{t('components.notification.no_notifications')}</p>
        </div>
      )}
    </NotificationListWrapper>
  );
};

const NotificationListWrapper = styled.div`
  margin-left: 15px,
  margin-right: 15px,
  color: rgba(0, 0, 0, 0.65),
  font-family: Roboto, sans-serif,
`;

interface NotificationsList {
  unseenOffers: Offer[];
}

export default NotificationsList;
