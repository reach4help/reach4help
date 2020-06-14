import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import mapPinLocation from '../../assets/mappinlocation.gif';

const { Paragraph } = Typography;

const UnsupportedLocation = () => {
  const { t } = useTranslation();

  return (
    <UnsupportedLocationWrapper>
      <MapPinLocation src={mapPinLocation} alt="map pin location" />
      <Title>{t('user_data_form.geolocation_unavailable_title')}</Title>
      <Explanation>
        {t('user_data_form.geolocation_unavailable_text')}
      </Explanation>
    </UnsupportedLocationWrapper>
  );
};

const UnsupportedLocationWrapper = styled.div`
  min-height: 585px;
`;

const MapPinLocation = styled.img`
  height: 162px;
  width: 162px;
  display: block;
  margin: auto;
`;

const Title = styled.h5`
  font-size: 20px;
  margin-top: 32px;
  text-align: center;
`;

const Explanation = styled(Paragraph)`
  margin-top: 34px;
  text-align: center;
`;

export default UnsupportedLocation;
