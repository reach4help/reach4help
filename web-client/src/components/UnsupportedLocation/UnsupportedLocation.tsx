import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

import mapPinLocation from '../../assets/mappinlocation.gif';

const { Title, Paragraph } = Typography;

const MapPinLocation = styled.img`
  height: 162px;
  width: 162px;
`;

const StyledTitle = styled(Title)`
  margin-top: 32px;
`;

const Explanation = styled(Paragraph)`
  margin-top: 34px;
`;

const UnsupportedLocation = () => {
  return (
    <div>
      <MapPinLocation src={mapPinLocation} alt="map pin location" />
      <StyledTitle>Title Here</StyledTitle>
      <Explanation>Info Here</Explanation>
    </div>
  );
};

export default UnsupportedLocation;
