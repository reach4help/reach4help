import React, { useEffect, useState } from 'react';
import { Offer } from 'src/models/offers';
import { Request } from 'src/models/requests';

interface RequestListProps {
  requests?: Record<string, Request>;
  offers?: Record<string, Record<string, Offer>>;
  loading: boolean;
  handleRequest?: Function;
  isCavAndOpenRequest?: boolean;
  isPinAndOpenRequest?: boolean;
  RequestItem: React.FC<any>;
  pendingOffersGiven?: Record<string, Offer[]>;
  cavDeclinedOffersGiven?: Record<string, Offer[]>;
  hideUserPics?: boolean;
  toCloseRequest?: Function;
}

const RequestList: React.FC<RequestListProps> = ({
  requests,
  offers = {},
  loading,
  handleRequest,
  isCavAndOpenRequest,
  isPinAndOpenRequest,
  RequestItem,
  cavDeclinedOffersGiven,
  hideUserPics,
  toCloseRequest,
}): React.ReactElement => {
  const [requestList, setRequestList] = useState<React.ReactElement<any>[]>([]);
  const [requestsRendered, setRequestsRendered] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (requests) {
      const internalRequestList: React.ReactElement<any>[] = [];
      const internalRequestsRendered: Record<string, boolean> = {};

      for (const id in requests) {
        if (id && requests[id] && !requestsRendered[id]) {
          internalRequestsRendered[id] = true;
          internalRequestList.push(
            <RequestItem
              key={id}
              request={requests[id]}
              handleRequest={(action?: boolean) =>
                handleRequest && handleRequest(id, action)
              }
              isCavAndOpenRequest={isCavAndOpenRequest}
              isPinAndOpenRequest={isPinAndOpenRequest}
              offers={offers[id]}
              toCloseRequest={(action?: boolean) =>
                toCloseRequest && toCloseRequest(id, action)
              }
            />,
          );
        }
      }

      if (internalRequestList.length) {
        setRequestsRendered(internalRequestsRendered);
        setRequestList(internalRequestList);
      }
    }
  }, [
    requests,
    offers,
    handleRequest,
    isCavAndOpenRequest,
    isPinAndOpenRequest,
    cavDeclinedOffersGiven,
    hideUserPics,
    requestsRendered,
    toCloseRequest,
    setRequestList,
  ]);

  // issue with indefinite loading, needs fix
  if (loading) {
    return <>Loading...</>;
  }

  return <div style={{ marginBottom: '64px' }}>{requestList}</div>;
};

export default RequestList;
