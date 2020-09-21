import GoogleMapReact from 'google-map-react';
import React from 'react';
import styled from 'styled-components';

export const GeocoderComponent: React.FC<GeocoderProps> = ({
  Geocoder,
  setGeocoder,
}) => {
  const initGeocoder = ({ maps }) => {
    if (Geocoder === undefined) {
      setGeocoder(new maps.Geocoder());
    }
  };

  return (
    <Map>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{
          key: `${process.env.REACT_APP_GMAPS_API_KEY}`,
        }}
        defaultCenter={{
          lat: 51.235498,
          lng: 6.800983,
        }}
        defaultZoom={11}
        onGoogleApiLoaded={initGeocoder}
      />
    </Map>
  );
};

const Map = styled.div`
  height: 0;
`;

export interface GeocoderProps {
  Geocoder: any;
  setGeocoder: (gecoder: any) => void;
}
