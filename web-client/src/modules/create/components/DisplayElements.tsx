import React from 'react';
import WebClientMap from 'src/components/WebClientMap/WebClientMap';
import styled from 'styled-components';

export const AddressDisplay = ({ location }) => (
  <AddressDisplayWrapper>
    <b> Address </b>
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
  font-family: serif;
`;

export const ButtonsDisplay = ({ children }) => (
  <ButtonsDisplayDiv>{children}</ButtonsDisplayDiv>
);

const ButtonsDisplayDiv = styled.div`
  display: flex;
  position: absolute;
  top: 90%;
`;

const mapHeight = '250px';
const MapDiv = styled.div`
  height: ${mapHeight};
  margin-bottom: 20px;
`;

export const MapDisplay = ({ coords }) => (
  <MapDiv>
    {coords && (
      <WebClientMap
        destinations={[]}
        zoom={12}
        height={mapHeight}
        origin={{ lat: coords.latitude, lng: coords.longitude }}
      />
    )}
  </MapDiv>
);
