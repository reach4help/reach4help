import React, { ReactElement } from 'react';

import TimelineViewContainer from '../../../containers/TimelineViewContainer/TimelineViewContainer';

const TimelineViewRoute: React.FC<any> = ({ match }): ReactElement => (
  <TimelineViewContainer requestId={match.params.requestId} />
);

export default TimelineViewRoute;
