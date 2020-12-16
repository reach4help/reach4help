import React from 'react';

export const AddressDisplay = ({ location }) => (
  <div>
    <div>{location.address1}</div>
    <div>{location.address2}</div>
    <div>
      {location.city}, {location.state}
    </div>
    <div>{location.country}</div>
    <div>{location.postalCode}</div>
  </div>
);
