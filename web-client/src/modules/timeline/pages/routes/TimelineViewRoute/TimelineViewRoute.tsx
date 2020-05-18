import React, { ReactElement } from 'react';
import styled from 'styled-components';

import TimelineViewContainer from '../../../containers/TimelineViewContainer/TimelineViewContainer';

const TimelineViewRoute: React.FC<any> = ({ match }): ReactElement => (
  <Wrapper>
    <TimelineViewContainer requestId={match.params.requestId} />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export default TimelineViewRoute;
