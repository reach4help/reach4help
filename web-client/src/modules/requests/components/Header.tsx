import React from 'react';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../../../theme/colors';

const Header: React.FC<HeaderProps> = ({
  requestsType,
  numRequests,
  isCav,
}): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <>
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
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '30px',
          }}
        >
          <b>{`${requestsType}  ${t(
            'modules.navigation.components.Header.requests',
          )}`}</b>
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
          {numRequests}
        </h2>
      </div>
    </>
  );
};

interface HeaderProps {
  requestsType: string;
  numRequests?: number;
  isCav: boolean;
  isAcceptedRequests?: boolean;
}

export default Header;
