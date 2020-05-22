import React, { useEffect, useState } from 'react';
import { Offer } from 'src/models/offers';
import { Request } from 'src/models/requests';

interface RequestListProps {
  requests?: Record<string, Request>;
  loading: boolean;
  handleRequest?: Function;
  isCavAndOpenRequest: boolean;
  RequestItem: React.FC<any>;
  pendingOffersGiven?: Record<string, Offer[]>;
  cavDeclinedOffersGiven?: Record<string, Offer[]>;
  hideUserPics?: boolean;
  toCloseRequest?: Function;
  isPin?: boolean;
}

const RequestList: React.FC<RequestListProps> = ({
  requests,
  loading,
  handleRequest,
  isCavAndOpenRequest,
  RequestItem,
  pendingOffersGiven,
  cavDeclinedOffersGiven,
  hideUserPics,
  toCloseRequest,
  isPin,
}): React.ReactElement => {
  const [requestList, setRequestList] = useState<React.ReactElement<any>[]>([]);

  useEffect(() => {
    if (requests) {
      const internalRequestList: React.ReactElement<any>[] = [];

      for (const id in requests) {
        if (id && requests[id]) {
          internalRequestList.push(
            <RequestItem
              key={id}
              request={requests[id]}
              handleRequest={(action?: boolean) =>
                handleRequest && handleRequest(id, action)
              }
              isCavAndOpenRequest={isCavAndOpenRequest}
              pendingOffersGiven={pendingOffersGiven && pendingOffersGiven[id]}
              cavDeclinedOffersGiven={
                cavDeclinedOffersGiven && cavDeclinedOffersGiven[id]
              }
              hideUserPic={hideUserPics}
              toCloseRequest={(action?: boolean) =>
                toCloseRequest && toCloseRequest(id, action)
              }
              isPin={isPin}
            />,
          );
        }
      }

      setRequestList(internalRequestList);
    }
  }, [
    requests,
    handleRequest,
    isCavAndOpenRequest,
    pendingOffersGiven,
    cavDeclinedOffersGiven,
    hideUserPics,
    toCloseRequest,
    isPin,
  ]);

  // issue with indefinite loading, needs fix
  if (!requests || loading) {
    return <>Loading...</>;
  }

  return <div style={{ marginBottom: '64px' }}>{requestList}</div>;
};

export default RequestList;
