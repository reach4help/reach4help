/* eslint-disable @typescript-eslint/camelcase */
import { firestore } from 'firebase';
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import LoadingWrapper from 'src/components/LoadingWrapper/LoadingWrapper';
import { observeUserAction } from 'src/ducks/auth/actions';
import { AuthState } from 'src/ducks/auth/types';
import {
  observePrivileged,
  observeProfile,
  setUserProfile,
} from 'src/ducks/profile/actions';
import { ProfileState } from 'src/ducks/profile/types';
import styled from 'styled-components';

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
    if (typeof Geocoder === 'undefined') {
      if (process.env.NODE_ENV === 'production') {
        setGeocoder(new maps.Geocoder());
      } else {
        setGeocoder({
          geocode: (
            { location }: { address?: string; location?: firestore.GeoPoint },
            callback: Function,
          ) => {
            callback(
              [
                {
                  address_components: [
                    {
                      long_name: '1600',
                      short_name: '1600',
                      types: ['street_number'],
                    },
                    {
                      long_name: 'Amphitheatre Parkway',
                      short_name: 'Amphitheatre Pkwy',
                      types: ['route'],
                    },
                    {
                      long_name: 'Mountain View',
                      short_name: 'Mountain View',
                      types: ['locality', 'political'],
                    },
                    {
                      long_name: 'Santa Clara County',
                      short_name: 'Santa Clara County',
                      types: ['administrative_area_level_2', 'political'],
                    },
                    {
                      long_name: 'California',
                      short_name: 'CA',
                      types: ['administrative_area_level_1', 'political'],
                    },
                    {
                      long_name: 'United States',
                      short_name: 'US',
                      types: ['country', 'political'],
                    },
                    {
                      long_name: '94043',
                      short_name: '94043',
                      types: ['postal_code'],
                    },
                  ],
                  formatted_address:
                    '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
                  geometry: {
                    location: {
                      lat: () => (location ? location.latitude : 37.4267861),
                      lng: () => (location ? location.longitude : -122.0806032),
                    },
                    location_type: 'ROOFTOP',
                    viewport: {
                      northeast: {
                        lat: location ? location.latitude : 37.4281350802915,
                        lng: location ? location.longitude : -122.0792542197085,
                      },
                      southwest: {
                        lat: location ? location.latitude : 37.4281350802915,
                        lng: location ? location.longitude : -122.0792542197085,
                      },
                    },
                  },
                  place_id: 'ChIJtYuu0V25j4ARwu5e4wwRYgE',
                  plus_code: {
                    compound_code:
                      'CWC8+R3 Mountain View, California, United States',
                    global_code: '849VCWC8+R3',
                  },
                  types: ['street_address'],
                },
              ],
              'OK',
            );
          },
        });
      }
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
          if (lat && lng && termsAndPrivacyAccepted && displayName && user) {
            dispatch(
              setUserProfile(
                newAddress,
                results[0],
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

  // In theory this is needed to force a render when the Geocoder
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [Geocoder]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      initGeocoder({ maps: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Map>
        {process.env.NODE_ENV === 'production' && (
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
        )}
      </Map>
      {typeof Geocoder !== 'undefined' && (
        <PersonalDataForm
          Geocoder={Geocoder}
          handleFormSubmit={handleFormSubmit}
          user={user}
          profile={profileState.profile}
          privilegedInfo={profileState.privilegedInformation}
        />
      )}
      {typeof Geocoder === 'undefined' && <LoadingWrapper />}
    </>
  );
};

PersonalDataFormContainer.propTypes = {};

export default PersonalDataFormContainer;
