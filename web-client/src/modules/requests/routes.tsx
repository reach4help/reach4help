import React, { lazy, ReactElement, Suspense } from 'react';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';
import Tabs from 'src/components/Tabs';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import {
  AcceptedRequestsLocation,
  FindRequestsLocation,
  NewRequestsLocation,
  OpenRequestsLocation,
  PostListLocation,
} from './constants';
import { OfferedRequestsContainer } from './containers/OfferedRequestsContainer';
import { RequestedRequestsContainer } from './containers/RequestedRequestsContainer';

const AcceptedRequestsContainer = lazy(() =>
  import('./containers/AcceptedRequestsContainer'),
);

const FindRequestsContainer = lazy(() =>
  import('./containers/FindRequestsContainer'),
);

const NewRequestsContainer = lazy(() =>
  import('./containers/NewRequestsContainer'),
);

const OpenRequestsContainer = lazy(() =>
  import('./containers/OpenRequestsContainer'),
);

const PostListTabs: React.FC = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { type } = useParams() as Record<string, string>;
  const history = useHistory();
  const onChange = (activeKey: string) => {
    history.push(PostListLocation.toUrl({ type: activeKey }));
  };
  const tabs = [
    {
      component: RequestedRequestsContainer,
      key: 'request',
      tKey:
        'modules.requests.containers.TabbedRequestsContainer.requests_tab_label',
      props: {},
    },
    {
      component: OfferedRequestsContainer,
      key: 'offer',
      tKey:
        'modules.requests.containers.TabbedRequestsContainer.offers_tab_label',
      props: {},
    },
  ];

  return (
    <Tabs<{}>
      currentKey={type}
      tabs={tabs}
      onChange={onChange}
      defaultKey="request"
    />
  );
};

const Routes = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route
        path={OpenRequestsLocation.path}
        component={OpenRequestsContainer}
        exact
      />
      <Route path={PostListLocation.path} component={PostListTabs} />
      <Route
        path={AcceptedRequestsLocation.path}
        component={AcceptedRequestsContainer}
        exact
      />
      <Route
        path={FindRequestsLocation.path}
        component={FindRequestsContainer}
        exact
      />
      <Route
        path={NewRequestsLocation.path}
        component={NewRequestsContainer}
        exact
      />
    </Switch>
  </Suspense>
);

export default Routes;
