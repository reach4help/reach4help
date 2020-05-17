import React from 'react';

interface HeaderProps {
  requestsType: string;
  numRequests?: number;
  isCav: boolean;
}

const Header: React.FC<HeaderProps> = ({
  requestsType,
  numRequests,
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
        color: 'rgba(0, 0, 0, 0.85)',
        fontSize: '30px',
      }}
    >
      <b>{`${requestsType} Requests`}</b>
    </h1>
    <h2
      style={{
        backgroundColor: isCav ? '#811E78' : '#FF7B02',
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
);
export default Header;
