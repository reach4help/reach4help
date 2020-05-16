import React from 'react';
import { Request } from 'src/models/requests';

import RequestItem from '../RequestItem/RequestItem';

interface RequestListProps {
  requests?: Request[];
  loading: boolean;
  handleRequest: Function;
  isCavAndOpenRequest: boolean;
}

const RequestList: React.FC<RequestListProps> = ({
  requests,
  loading,
  handleRequest,
  isCavAndOpenRequest,
}): React.ReactElement => {
  // issue with indefinite loading, needs fix
  if (!requests || loading) {
    return <>Loading...</>;
  }

  return (
    <>
      {requests.map((request, index) => (
        <RequestItem
          key={index}
          request={request}
          handleRequest={handleRequest}
          isCavAndOpenRequest={isCavAndOpenRequest}
        />
      ))}
    </>
  );
};

export default RequestList;
