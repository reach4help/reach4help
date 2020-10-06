import React, { lazy, ReactElement, Suspense } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
} from 'react-router-dom';
import Tabs from 'src/components/Tabs';
import { ApplicationPreference } from 'src/models/users';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import {
  AcceptedRequestsLocation,
  FindRequestsLocation,
  OpenRequestsLocation,
  PostListLocation,
} from './constants';
import PostsContainer from './containers/PostsContainer';

const AcceptedRequestsContainer = lazy(() =>
  import('./containers/AcceptedRequestsContainer'),
);

const FindRequestsContainer = lazy(() =>
  import('./containers/FindRequestsContainer'),
);

const OpenRequestsContainer = lazy(() =>
  import('./containers/OpenRequestsContainer'),
);

// TODO: To be removed and container for request list should be used instead
const RequestListPage: React.FC = () => (
  <PostsContainer
    postMode={ApplicationPreference.pin}
    status="all"
  />
);

// TODO: To be removed and container for offer list should be used instead
const OfferListPage: React.FC = () => (
  <PostsContainer
    postMode={ApplicationPreference.cav}
    status="all"
  />
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
      component: RequestListPage,
      key: 'request',
      tKey:
        'modules.requests.containers.TabbedRequestsContainer.requests_tab_label',
      props: {},
    },
    {
      component: OfferListPage,
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
      <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  </Suspense>
);

export default Routes;
