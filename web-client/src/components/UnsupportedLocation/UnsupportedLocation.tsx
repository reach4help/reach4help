import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import mapPinLocation from '../../assets/mappinlocation.gif';

const { Paragraph } = Typography;

const Container = styled.div`
  min-height: 585px;
`;

const MapPinLocation = styled.img`
  height: 162px;
  width: 162px;
  display: block;
  margin: auto;
`;

const StyledTitle = styled.h5`
  font-size: 20px;
  margin-top: 32px;
  text-align: center;
`;

const Explanation = styled(Paragraph)`
  margin-top: 34px;
  text-align: center;
`;

const UnsupportedLocation = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <MapPinLocation src={mapPinLocation} alt="map pin location" />
      <StyledTitle>
        {t('user_data_form.geolocation_unavailable_title')}
      </StyledTitle>
      <Explanation>
        {t('user_data_form.geolocation_unavailable_text')}
      </Explanation>
    </Container>
  );
};

export default UnsupportedLocation;
