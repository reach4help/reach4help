import React, { useEffect, useState } from 'react';
import { Request } from 'src/models/requests';

interface RequestListProps {
  requests?: Record<string, Request>;
  loading: boolean;
  handleRequest?: Function;
  isCavAndOpenRequest: boolean;
  RequestItem: React.FC<any>;
}

const RequestList: React.FC<RequestListProps> = ({
  requests,
  loading,
  handleRequest,
  isCavAndOpenRequest,
  RequestItem,
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
            />,
          );
        }
      }

      setRequestList(internalRequestList);
    }
  }, [requests, handleRequest, isCavAndOpenRequest]);

  // issue with indefinite loading, needs fix
  if (!requests || loading) {
    return <>Loading...</>;
  }

  return <>{requestList}</>;
};

export default RequestList;
