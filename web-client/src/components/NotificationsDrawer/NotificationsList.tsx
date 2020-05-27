import React from 'react';

import { Offer } from '../../models/offers';
import Notification from './Notification';

interface NotificationsList {
  isCav?: boolean;
  seenOffers: Offer[];
}

const NotificationsList: React.FC<NotificationsList> = ({
  isCav,
  seenOffers,
}): React.ReactElement => (
  <div
    style={{
      marginLeft: '15px',
      marginRight: '15px',
      color: 'rgba(0, 0, 0, 0.65)',
      fontFamily: 'Roboto, sans-serif',
    }}
  >
    {seenOffers.length > 0 &&
      seenOffers.map((item, index) => (
        <Notification
          key={index}
          cavUser={item.cavUserSnapshot}
          offerStatus={item.status}
          offerRequest={item.requestSnapshot}
          seenAt={item.seenAt?.toDate()}
          isCav={isCav}
        />
      ))}
    {seenOffers.length === 0 && (
      <div style={{ textAlign: 'center' }}>
        <p>No new notifications.</p>
      </div>
    )}
  </div>
);
export default NotificationsList;
