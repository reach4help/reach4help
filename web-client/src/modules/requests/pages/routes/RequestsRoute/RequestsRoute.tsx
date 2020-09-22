import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { OfferRequests } from 'src/modules/requests/containers/OfferRequests.tsx';

import { AskRequests } from '../../../containers/AskRequests';

const RequestsRoute: React.FC = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { type } = useParams() as Record<string, string>;
  if (type === 'ask') {
    return <AskRequests />;
  }
  return <OfferRequests />;
};

export default RequestsRoute;
