import React, { lazy, ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import {
  TimelineAcceptedViewLocation,
  TimelineViewLocation,
} from './constants';

const TimelineViewContainer = lazy(() =>
  import('./containers/TimelineViewContainer/TimelineViewContainer'),
);

const TimelineAcceptedViewPage: React.FC<any> = ({ match }): ReactElement => (
  <Wrapper>
    <TimelineViewContainer accepted requestId={match.params.requestId} />
  </Wrapper>
);

const TimelineViewPage: React.FC<any> = ({ match }): ReactElement => (
  <Wrapper>
    <TimelineViewContainer requestId={match.params.requestId} />
  </Wrapper>
);

const Routes = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route
        path={TimelineAcceptedViewLocation.path}
        component={TimelineAcceptedViewPage}
        exact
      />
      <Route
        path={TimelineViewLocation.path}
        component={TimelineViewPage}
        exact
      />
      <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  </Suspense>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export default Routes;
