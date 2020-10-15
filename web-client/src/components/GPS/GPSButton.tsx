import { Button, Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import gpstarget from '../../assets/gpstarget.svg';

export const GPSButton: React.FC<IGPSButton> = ({
  geolocationAuthorized,
  geolocationAvailable,
  handleGetCoords,
  isLoading,
}) => {
  const { t } = useTranslation();

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

const PersonalDataFormButton = styled(Button)`
  margin-top: 20px;
`;

const GPSTarget = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

interface IGPSButton {
  geolocationAvailable: boolean | undefined;
  geolocationAuthorized: boolean | undefined;
  handleGetCoords: () => void;
  isLoading: boolean;
}
