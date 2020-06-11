import React from 'react';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../../../../theme/colors';

interface HeaderProps {
  requestsType: string;
  numRequests?: number;
  isCav: boolean;
  isAcceptedRequests?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  requestsType,
  numRequests,
  isCav,
  isAcceptedRequests,
}): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <>
      {isAcceptedRequests && !isCav && (
        <div
          style={{
            fontFamily: 'Roboto, sans-serif',
            textAlign: 'center',
            paddingTop: '12px',
            paddingBottom: '4px',
            paddingLeft: '15px',
            paddingRight: '15px',
            background: 'rgba(0, 0, 0, 0.05)',
            fontSize: '12px',
            lineHeight: '20px',
          }}
        >
          <p
            style={{
              color: COLORS.backgroundAlternative,
              fontWeight: 'bold',
              marginBottom: '4px',
            }}
          >
            {t('modules.navigation.components.Header.remember')}
          </p>
          <p style={{ color: 'rgba(0, 0, 0, 0.5' }}>
            {t('modules.navigation.components.Header.reject_reminder')}
          </p>
        </div>
      )}
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
          <b>{`${requestsType}  ${t('modules.navigation.components.Header.requests')}`}</b>
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
export default Header;
