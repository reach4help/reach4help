import React from 'react';
import { Request } from 'src/models/requests';

interface RequestListProps {
  requests?: Request[];
  loading: boolean;
}

const RequestList: React.FC<RequestListProps> = ({
  requests,
  loading,
}): React.ReactElement => {
  if (loading || !requests) {
    return <>Loading...</>;
  }

  return (
    <>
      {requests.map((request, index) => (
        <div key={index}>
          {request.title}
          <br />
          {request.description}
          <hr />
        </div>
      ))}
    </>
  );
};

export default RequestList;
