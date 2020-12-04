/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import { Offer } from 'src/models/offers';
import { Request } from 'src/models/requests';

const RequestList: React.FC<RequestListProps> = ({
  requests,
  loading,
  // TODO: (es) remove handleTimeline,
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
              // TODO: (es) remove requestId={id} // TODO: (es) Use key instead?  what is key used for?
              request={requests[id]}
              // TODO: (es) remove handleTimeline={handleTimeline}
              isCavAndOpenRequest={isCavAndOpenRequest}
              isPinAndOpenRequest={isPinAndOpenRequest}
              offers={undefined}
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
    // TODO: (es) remove handleTimeline,
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
    return <LoadingIndicator />;
  }

  return <div>{requestList}</div>;
};

interface RequestListProps {
  requests?: Record<string, Request>;
  loading: boolean;
  // TODO: (es) remove handleTimeline?: Function;
  isCavAndOpenRequest?: boolean;
  isPinAndOpenRequest?: boolean;
  RequestItem: React.FC<any>;
  pendingOffersGiven?: Record<string, Offer[]>;
  cavDeclinedOffersGiven?: Record<string, Offer[]>;
  hideUserPics?: boolean;
  toCloseRequest?: Function;
}

export default RequestList;
