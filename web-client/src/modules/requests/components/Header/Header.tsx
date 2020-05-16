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
    }}
  >
    <h2>
      <b>{`${requestsType} Requests`}</b>
    </h2>
    <h2
      style={{
        backgroundColor: isCav ? '#811E78' : '#FF7B02',
        color: '#FFFFFF',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '5px',
      }}
    >
      {numRequests}
    </h2>
  </div>
);
export default Header;
