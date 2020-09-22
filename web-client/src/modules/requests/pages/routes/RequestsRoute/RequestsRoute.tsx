import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { OfferPosts } from 'src/modules/requests/containers/OfferPostsContainer';

import { AskPosts } from '../../../containers/AskPostsContainer';

const RequestsRoute: React.FC = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { type } = useParams() as Record<string, string>;
  if (type === 'ask') {
    return <AskPosts />;
  }
  return <OfferPosts />;
};

export default RequestsRoute;
