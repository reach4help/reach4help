import { firestore } from 'firebase';
import GoogleMapReact from 'google-map-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IUserAddress } from 'src/models/users/privilegedInformation';
import styled from 'styled-components';

export const GeocoderComponent = <P extends ISubComponent>({
  Component,
  otherProps,
}: IGeocoder<P>) => {
  const { t } = useTranslation();

  const [Geocoder, setGeocoder] = useState<any | undefined>(undefined);

  const initGeocoder = ({ maps }) => {
    if (Geocoder === undefined) {
      setGeocoder(new maps.Geocoder());
    }
  };

  const geocodeAddress = (
    addressToGeocode: Pick<IUserAddress, Exclude<keyof IUserAddress, 'coords'>>,
  ): Promise<IUserAddress> => {
    // eslint-disable-next-line max-len
    const addressAsString = `${addressToGeocode.address1},${addressToGeocode.address2},${addressToGeocode.city},${addressToGeocode.state},${addressToGeocode.postalCode},${addressToGeocode.country}`;
    return new Promise((resolve, reject) => {
      Geocoder.geocode({ address: addressAsString }, (results, status) => {
        if (status === 'OK') {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          resolve({
            ...addressToGeocode,
            coords: new firestore.GeoPoint(lat, lng),
          });
        } else {
          alert(
            t(
              'modules.personal-data.containers.PersonalDataFormContainer.address_error',
            ),
          );
          reject(new Error("Address couldn't be geocded"));
        }
      });
    });
  };

  return (
    <>
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
      <Component {...(otherProps as P)} geocode={geocodeAddress} />
    </>
  );
};

const Map = styled.div`
  height: 0;
`;

interface ISubComponent {
  geocode: (
    address: Pick<IUserAddress, Exclude<keyof IUserAddress, 'coords'>>,
  ) => Promise<IUserAddress>;
}

interface IGeocoder<P extends ISubComponent> {
  Component: React.FC<P>;
  otherProps: Pick<P, Exclude<keyof P, 'geocode'>>;
}
