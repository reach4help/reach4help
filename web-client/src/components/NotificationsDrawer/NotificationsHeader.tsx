import React from 'react';

import { COLORS } from '../../theme/colors';

interface NotificationsHeaderProps {
  numSeenOffers?: number;
  isCav?: boolean;
}

const NotificationsHeader: React.FC<NotificationsHeaderProps> = ({
  numSeenOffers = 0,
  isCav,
}): React.ReactElement => (
  <div
    style={{
      margin: '25px',
      marginBottom: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'Roboto, sans-serif',
    }}
  >
    <h1
      style={{
        color: 'rgba(0, 0, 0, 0.65)',
        fontSize: '30px',
      }}
    >
      <b>Notifications</b>
    </h1>
    <h2
      style={{
        backgroundColor: isCav ? COLORS.primaryDark : COLORS.brandOrange,
        color: '#FFFFFF',
        paddingLeft: '10px',
        paddingRight: '10px',
        marginTop: '10px',
        marginBottom: '17px',
        borderRadius: '5px',
      }}
    >
      {numSeenOffers}
    </h2>
  </div>
);
export default NotificationsHeader;
