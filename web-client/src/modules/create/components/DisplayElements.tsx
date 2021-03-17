import { Button, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import WebClientMap from 'src/components/WebClientMap/WebClientMap';
import styled from 'styled-components';

const DetailsDisplayWrapper = styled.div`
  margin: 20px 0;
`;

export const DetailsDisplay = ({ details }) => {
  const { Paragraph } = Typography;
  return (
    <DetailsDisplayWrapper>
      <SectionLabel> {details.title} </SectionLabel>
      <Paragraph> {details.description} </Paragraph>
    </DetailsDisplayWrapper>
  );
};

const SectionLabel = styled.h1`
  font: Roboto, sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`;

const Address = styled.address`
  margin-left: 5px;
  line-height: 22px;
  font: Roboto, sans-serif;
  font-size: 14px;
`;

export const AddressDisplay = ({ location, prefix }) => {
  const { t } = useTranslation();

  return (
    <AddressDisplayWrapper>
      <SectionLabel role="heading">
        {prefix} {t('modules.create.stepTitles.map')}{' '}
      </SectionLabel>
      <Address>
        {location.address1}
        <br />
        {location.address2}
        <br />
        {location.city}, {location.state} <br />
        {location.country}
        <br />
        {location.postalCode}
      </Address>
    </AddressDisplayWrapper>
  );
};

const AddressDisplayWrapper = styled.div`
  margin: 20px 0;
`;

export const ButtonsContainer = styled.div`
  position: fixed;
  bottom: 30px;
  display: flex;
`;

export const DisplayButton = styled(Button)`
  flex: 1 1 1;
  margin: '5 0';
`;

const mapHeight = '250px';
const MapDiv = styled.div`
  height: ${mapHeight};
  margin-bottom: 20px;
`;

export const MapDisplay = ({ coords }) => (
  <MapDiv>
    {coords && (
      <WebClientMap
        destinations={[]}
        zoom={17}
        height={mapHeight}
        origin={{ lat: coords.latitude, lng: coords.longitude }}
        canRelocate={false}
      />
    )}
  </MapDiv>
);
