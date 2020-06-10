import React from 'react';
import { useTranslation } from 'react-i18next';
import { Offer } from 'src/models/offers';

import Notification from './Notification';

interface NotificationsList {
  isCav?: boolean;
  unseenOffers: Offer[];
}

const NotificationsList: React.FC<NotificationsList> = ({
  isCav,
  unseenOffers,
}): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        marginLeft: '15px',
        marginRight: '15px',
        color: 'rgba(0, 0, 0, 0.65)',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      {unseenOffers.length > 0 &&
        unseenOffers.map((item, index) => (
          <Notification
            key={index}
            cavUser={item.cavUserSnapshot}
            offerStatus={item.status}
            offerRequest={item.requestSnapshot}
            updatedAt={item.updatedAt.toDate()}
            isCav={isCav}
          />
        ))}
      {unseenOffers.length === 0 && (
        <div style={{ textAlign: 'center' }}>
          <p> {t('components.notification.no_notifications')} </p>
        </div>
      )}
    </div>
  );
};
export default NotificationsList;
