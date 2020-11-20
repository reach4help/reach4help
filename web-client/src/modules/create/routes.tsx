import React, { lazy, ReactElement, Suspense } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';

import LoadingWrapper from '../../components/LoadingComponent/LoadingComponent';
import { CreatePostLocation, CreatePostTypes } from './constants';

const CreatePostContainer = lazy(() =>
  import('./containers/CreatePostContainer'),
);

const CreatePostPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { type } = useParams() as Record<string, string>;
  return <CreatePostContainer createPostType={type as CreatePostTypes} />;
};

const Routes = (): ReactElement => (
  <Suspense fallback={<LoadingWrapper />}>
    <Switch>
      <Route path={CreatePostLocation.path} component={CreatePostPage} />
      <Route path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  </Suspense>
);

export default Routes;
