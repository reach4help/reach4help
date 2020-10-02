import { Button, Col, Modal, Row } from 'antd';
import { firestore } from 'firebase';
import GoogleMapReact from 'google-map-react';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DEVICE_MIN } from 'src/constants/mediaQueries';
import { IUserAddress } from 'src/models/users/privilegedInformation';
import styled from 'styled-components';

import gpstarget from '../../../../assets/gpstarget.svg';

const GPSButton: React.FC = () => {
  const [geolocationAvailable, setGeoAvailable] = useState<boolean | undefined>(
    undefined,
  );
  const [geolocationAuthorized, setGeoAuthorized] = useState<
    undefined | boolean
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    // detect if browser supports geolocation
    const geoTest = 'geolocation' in navigator;
    setGeoAvailable(geoTest);
  }, []);

  const handleGetCoords = () => {
    setIsLoading(true);

    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(
      position => {
        setIsLoading(false);
        setGeoAuthorized(true);
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      GeolocationPositionError => {
        setModalVisible(true);
        setGeoAuthorized(false);
        setIsLoading(false);
        if (GeolocationPositionError) {
          // do something regarding the error
        }
      },
    );
  };

  return (
    <Row>
      <Col span="24" style={{ textAlign: 'center' }}>
        {geolocationAuthorized !== false && geolocationAvailable && (
          <>
            <PersonalDataFormButton
              loading={isLoading}
              icon={<GPSTarget src={gpstarget} />}
              type="primary"
              onClick={handleGetCoords}
            >
              {t(
                'modules.personal-data.components.PersonalDataForm.gps_button',
              )}
            </PersonalDataFormButton>
          </>
        )}
        {geolocationAuthorized === false && (
          <PersonalDataFormButton
            icon={<GPSTarget src={gpstarget} />}
            type="primary"
            danger
            onClick={handleGetCoords}
          >
            {t('modules.personal-data.components.PersonalDataForm.gps_button')}
          </PersonalDataFormButton>
        )}
      </Col>
    </Row>
  );
};

const GPSInstructionsModal: React.FC<IGPSInstructionsModal> = ({
    modalVisible,
    instructionsVisible,
    setInstructionsVisible,
    setModalVisible,
}) => {

  const { t } = useTranslation();

  return (
    <Modal
      closable={false}
      style={{ top: 10 }}
      title=""
      visible={modalVisible}
      footer={[
        <Fragment key="footer1">
          {!instructionsVisible && (
            <PersonalDataFormButton
              type="primary"
              key="back"
              onClick={() => {
                setInstructionsVisible(true);
              }}
            >
              {t(
                'modules.personal-data.components.PersonalDataForm.learn_reactivate',
              )}
            </PersonalDataFormButton>
          )}
          {instructionsVisible && (
            <PersonalDataFormButton
              type="primary"
              key="back"
              onClick={() => {
                setInstructionsVisible(false);
                setModalVisible(false);
                handleGetCoords();
              }}
            >
              {t(
                'modules.personal-data.components.PersonalDataForm.retry_geolocation',
              )}
            </PersonalDataFormButton>
          )}
        </Fragment>,
        <Fragment key="footer2">
          {!instructionsVisible && (
            <PersonalDataFormButton
              type="primary"
              key="back"
              onClick={() => {
                setModalVisible(false);
              }}
            >
              {t(
                'modules.personal-data.components.PersonalDataForm.continue_without_geolocation',
              )}
            </PersonalDataFormButton>
          )}
          {instructionsVisible && (
            <PersonalDataFormButton
              type="primary"
              key="back"
              onClick={() => {
                setInstructionsVisible(false);
              }}
            >
              {t('modules.personal-data.components.PersonalDataForm.go_back')}
            </PersonalDataFormButton>
          )}
        </Fragment>,
      ]}
    >
      {!instructionsVisible && (
        <>
          <div style={{ textAlign: 'center', marginTop: '-20px' }}>
            <img alt="Geolocation Inactive" src={geolocationinactive} />
          </div>
          <h4 style={{ marginBottom: '20px' }}>
            {t(
              'modulespersonal-data.components.PersonalDataForm.geolocation_modal_title',
            )}
          </h4>
          <p>
            {t(
              'modules.personal-data.components.PersonalDataForm.geolocation_modal_text',
            )}
          </p>
        </>
      )}
      {instructionsVisible && (
        <>
          <h4>
            {t(
              'modules.personal-data.components.PersonalDataForm.instructions_modal_title',
            )}
          </h4>
          <p>
            {t(
              'modules.personal-data.components.PersonalDataForm.instructions_modal_text',
            )}
          </p>
        </>
      )}
    </Modal>
  );
};

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

const PersonalDataFormButton = styled(Button)`
  margin-top: 20px;
`;

const GPSTarget = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

interface IGPSInstructionsModal {
    modalVisible: boolean;
    instructionsVisible: boolean;
    setInstructionsVisible: (val: boolean) => void;
    setModalVisible: (val: boolean) => void;
}

interface ISubComponent {
  getGPSCoords: () => void;
}

interface IGeocoder<P extends ISubComponent> {
  Component: React.FC<P>;
  otherProps: Pick<P, Exclude<keyof P, 'getGPSCoords'>>;
}
