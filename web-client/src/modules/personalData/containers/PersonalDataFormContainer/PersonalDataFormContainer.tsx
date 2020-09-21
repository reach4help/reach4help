/* eslint-disable @typescript-eslint/camelcase */
import { firestore } from 'firebase';
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { observeUserAction } from 'src/ducks/auth/actions';
import { AuthState } from 'src/ducks/auth/types';
import {
  observePrivileged,
  observeProfile,
  setUserProfile,
} from 'src/ducks/profile/actions';
import { ProfileState } from 'src/ducks/profile/types';
import styled from 'styled-components';

import LoadingWrapper from '../../../../components/LoadingComponent/LoadingComponent';
import PersonalDataForm, {
  IPersonalData,
} from '../../components/PersonalDataForm/PersonalDataForm';

// is there a place where we should put the interfaces that would be common
// for the wrapper and for the UI component ?

const PersonalDataFormContainer: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const user = useSelector(({ auth }: { auth: AuthState }) => auth.user);
  const dispatch = useDispatch();

  const Map = styled.div`
    height: 0;
  `;

  useEffect((): any => observeUserAction(dispatch), [dispatch]);

  useEffect((): any => {
    if (user && user.uid) {
      return observeProfile(dispatch, { uid: user.uid });
    }
    return undefined;
  }, [dispatch, user]);

  useEffect((): any => {
    if (user && user.uid) {
      return observePrivileged(dispatch, { uid: user.uid });
    }
    return undefined;
  }, [dispatch, user]);

  const [Geocoder, setGeocoder] = useState<any | undefined>(undefined);

  const initGeocoder = ({ maps }) => {
    if (Geocoder === undefined) {
      setGeocoder(new maps.Geocoder());
    }
  };

  const handleFormSubmit = (personalInfo: IPersonalData) => {
    const {
      address: newAddress,
      termsAndPrivacyAccepted,
      displayName,
      displayPic,
      sendNotificatoins,
    } = personalInfo;
    // eslint-disable-next-line max-len
    const address = `${newAddress.address1},${newAddress.address2},${newAddress.city},${newAddress.state},${newAddress.postalCode},${newAddress.country}`;
    if (typeof Geocoder !== 'undefined') {
      Geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          newAddress.coords = new firestore.GeoPoint(lat, lng);
          newAddress.name = 'default';
          if (lat && lng && termsAndPrivacyAccepted && displayName && user) {
            dispatch(
              setUserProfile(
                { default: newAddress },
                termsAndPrivacyAccepted,
                displayName,
                user.uid,
                sendNotificatoins,
                displayPic,
              ),
            );
          } else {
            alert(
              t(
                'modules.personal-data.containers.PersonalDataFormContainer.missing_data',
              ),
            );
          }
        } else {
          alert(
            t(
              'modules.personal-data.containers.PersonalDataFormContainer.address_error',
            ),
          );
        }
      });
    }
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
      {Geocoder === undefined && <LoadingWrapper />}
      {Geocoder !== undefined && (
        <PersonalDataForm
          Geocoder={Geocoder}
          handleFormSubmit={handleFormSubmit}
          user={user}
          profile={profileState.profile}
          privilegedInfo={profileState.privilegedInformation}
        />
      )}
    </>
  );
};

export default PersonalDataFormContainer;
