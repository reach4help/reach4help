import React from 'react';
import styled from 'styled-components';

export const AddressDisplay = ({ location }) => (
  <AddressDisplayWrapper>
    <h2> Address </h2>
    <div>{location.address1}</div>
    <div>{location.address2}</div>
    <div>
      {location.city}, {location.state}
    </div>
    <div>{location.country}</div>
    <div>{location.postalCode}</div>
  </AddressDisplayWrapper>
);

const AddressDisplayWrapper = styled.div`
  margin: 0 20;
`;

export const ButtonsDisplay = ({ children }) => (
  <ButtonsDisplayDiv>{children}</ButtonsDisplayDiv>
);

const ButtonsDisplayDiv = styled.div`
  display: flex;
  position: absolute;
  top: 90%;
`;
