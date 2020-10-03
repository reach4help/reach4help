import { Button, Modal } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import geolocationinactive from '../../assets/geolocationinactive.svg';
import { GPSButton } from './GPSButton';

export const GPSWrapper = <P extends ISubComponent>({
  Component,
  onGPSClick,
  otherProps,
}: IGPS<P>) => {
  const { t } = useTranslation();

  const [geolocationAvailable, setGeoAvailable] = useState<boolean | undefined>(
    undefined,
  );
  const [geolocationAuthorized, setGeoAuthorized] = useState<
    undefined | boolean
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(false);

  useEffect(() => {
    // detect if browser supports geolocation
    const geoTest = 'geolocation' in navigator;
    setGeoAvailable(geoTest);
  }, []);

  const handleGetCoords = (hideInstructions = false): Promise<Coords> => {
    setIsLoading(true);

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          setIsLoading(false);
          setGeoAuthorized(true);
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(location);
        },
        GeolocationPositionError => {
          if (!hideInstructions) {
            setModalVisible(true);
          }
          setGeoAuthorized(false);
          setIsLoading(false);
          reject(GeolocationPositionError);
        },
      );
    });
  };

  return (
    <>
      <Component
        {...(otherProps as P)}
        GPSButton={(): JSX.Element => (
          <GPSButton
            geolocationAuthorized={geolocationAuthorized}
            geolocationAvailable={geolocationAvailable}
            handleGetCoords={async () => {
              try {
                const coords = await handleGetCoords();
                if (onGPSClick) {
                  onGPSClick(undefined, coords);
                }
              } catch (error) {
                if (onGPSClick) {
                  onGPSClick(error, undefined);
                }
              }
            }}
            isLoading={isLoading}
          />
        )}
        getGPSCoords={(silent = true) => handleGetCoords(silent)}
      />
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
    </>
  );
};

const PersonalDataFormButton = styled(Button)`
  margin-top: 20px;
`;

interface Coords {
  lat: number;
  lng: number;
}

export interface ISubComponent {
  getGPSCoords: (silent?: boolean) => Promise<Coords>;
  GPSButton: JSX.Element;
}

interface IGPS<P extends ISubComponent> {
  Component: React.FC<P>;
  onGPSClick?: (
    error: PositionError | undefined,
    location: Coords | undefined,
  ) => void;
  otherProps?: Pick<P, Exclude<keyof P, 'getGPSCoords'>>;
}
