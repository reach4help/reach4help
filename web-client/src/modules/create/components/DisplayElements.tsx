import { Button, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import WebClientMap from 'src/components/WebClientMap/WebClientMap';
import styled from 'styled-components';

const DetailsDisplayWrapper = styled.div`
  margin: 20px 0;
`;

export const DetailsDisplay = ({ details }) => {
  const { Paragraph, Title } = Typography;
  return (
    <DetailsDisplayWrapper>
      <Title level={3}> {details.title} </Title>
      <Paragraph> {details.body} </Paragraph>
    </DetailsDisplayWrapper>
  );
};

export const AddressDisplay = ({ location }) => {
  const { t } = useTranslation();
  const { Title } = Typography;

  return (
    <AddressDisplayWrapper>
      <Title level={3}>{t('modules.create.displayElements.address')} </Title>
      <address>
        {location.address1}
        <br />
        {location.address2}
        <br />
        {location.city}, {location.state} <br />
        {location.country}
        <br />
        {location.postalCode}
      </address>
    </AddressDisplayWrapper>
  );
};

const AddressDisplayWrapper = styled.div`
  margin: 20px 0;
`;

export const ButtonsDisplay = ({ children }) => (
  <ButtonsDisplayDiv>{children}</ButtonsDisplayDiv>
);

export const ButtonsContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;
export const DisplayButton = styled(Button)`
  flex: 1 1 1;
  margin: '5 0';
`;

const ButtonsDisplayDiv = styled.div`
  position: absolute;
  top: 90%;

  display: flex;
  width: 80%;
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
        zoom={12}
        height={mapHeight}
        origin={{ lat: coords.latitude, lng: coords.longitude }}
        canRelocate={false}
      />
    )}
  </MapDiv>
);
