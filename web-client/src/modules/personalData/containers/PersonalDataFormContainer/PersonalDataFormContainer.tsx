import { Spin } from 'antd';
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AuthState } from 'src/ducks/auth/types';
import { ProfileState } from 'src/ducks/profile/types';
import styled from 'styled-components';

import PersonalDataForm from '../../components/PersonalDataForm/PersonalDataForm';

// is there a place where we should put the interfaces that would be common
// for the wrapper and for the UI component ?

interface ICoords {
  lat: number;
  lng: number;
}

interface IPersonalData {
  fullName?: string;
  displayName?: string;
  address1?: string;
  address2?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  coords?: ICoords;
  geolocation?: boolean;
}

const PersonalDataFormContainer: React.FC = (): React.ReactElement => {
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const user = useSelector(({ auth }: { auth: AuthState }) => auth.user);
  const { t } = useTranslation();
  const LoadingScreen = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const Map = styled.div`
    height: 0;
  `;

  const [Geocoder, setGeocoder] = useState<any | undefined>(undefined);

  const initGeocoder = ({ maps }) => {
    if (typeof Geocoder === 'undefined') {
      setGeocoder(new maps.Geocoder());
    }
  };

  const handleFormSubmit = (newAddress: IPersonalData) => {
    // eslint-disable-next-line max-len
    const address = `${newAddress.address1},${newAddress.address2},${newAddress.city},${newAddress.state},${newAddress.postalCode},${newAddress.country}`;
    const addressObj = { ...newAddress };
    if (typeof Geocoder !== 'undefined') {
      Geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          addressObj.coords = { lat, lng };
          // the results object contains the full result of the
          // geocoding api, you can improve the object to pass
          // and store in firebase
        } else {
          // API did not return Ok
        }
      });
    }
  };

  // In theory this is needed to force a render when the Geocoder
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [Geocoder]);

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
      {typeof Geocoder !== 'undefined' && (
        <PersonalDataForm
          Geocoder={Geocoder}
          handleFormSubmit={handleFormSubmit}
          user={user}
          profile={profileState.profile}
          priviledgedInfo={profileState.privilegedInformation}
        />
      )}
      {typeof Geocoder === 'undefined' && (
        <LoadingScreen>
          <p>{t('spinner')}</p>
          <Spin />
        </LoadingScreen>
      )}
    </>
  );
};

PersonalDataFormContainer.propTypes = {};

export default PersonalDataFormContainer;
