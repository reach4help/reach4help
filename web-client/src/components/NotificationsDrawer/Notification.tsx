import React from 'react';
import { OfferStatus } from 'src/models/offers';
import { Request } from 'src/models/requests';
import { User } from 'src/models/users';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const Text = styled.p`
  margin-bottom: 0px;
`;
const ReqTitle = styled.span`
  color: ${COLORS.brandOrange};
`;

interface NotificationProps {
  cavUser: User;
  offerStatus: OfferStatus;
  offerRequest: Request | null;
  updatedAt: Date;
  isCav?: boolean;
}

const Notification: React.FC<NotificationProps> = ({
  cavUser,
  offerStatus,
  offerRequest,
  updatedAt,
  isCav,
}): React.ReactElement => {
  const visualizeNotification = () => {
    if (offerStatus === OfferStatus.accepted) {
      if (isCav) {
        return (
          <Text>
            {offerRequest?.pinUserSnapshot.displayName ||
              offerRequest?.pinUserSnapshot.username ||
              'The request author'}
            {' accepted your offer for '}
            {offerRequest?.title ? (
              <ReqTitle>{offerRequest.title}</ReqTitle>
            ) : (
              'a request'
            )}
            .
          </Text>
        );
      }
      return (
        <Text>
          {'You have accepted '}
          {cavUser.displayName || cavUser.username}
          {"'s help for "}
          {offerRequest?.title ? (
            <ReqTitle>{offerRequest.title}</ReqTitle>
          ) : (
            'your task'
          )}
          .
        </Text>
      );
    }
    if (offerStatus === OfferStatus.rejected) {
      if (isCav) {
        return (
          <Text>
            {offerRequest?.pinUserSnapshot.displayName ||
              offerRequest?.pinUserSnapshot.username ||
              'The request author'}
            {' is already getting help in '}
            {offerRequest?.title ? (
              <ReqTitle>{offerRequest.title}</ReqTitle>
            ) : (
              'a request'
            )}
            .
          </Text>
        );
      }
      return (
        <Text>
          {'You have rejected '}
          {cavUser.displayName || cavUser.username}
          {"'s help for "}
          {offerRequest?.title ? (
            <ReqTitle>{offerRequest.title}</ReqTitle>
          ) : (
            'your task'
          )}
          .
        </Text>
      );
    }
    if (offerStatus === OfferStatus.pending) {
      if (isCav) {
        return (
          <Text>
            {'You have offered help for '}
            {offerRequest?.title ? (
              <ReqTitle>{offerRequest.title}</ReqTitle>
            ) : (
              'a request'
            )}
            .
          </Text>
        );
      }
      return (
        <Text>
          {cavUser.displayName || cavUser.username}
          {' has offered to help in '}
          {offerRequest?.title ? (
            <ReqTitle>{offerRequest.title}</ReqTitle>
          ) : (
            'your task'
          )}
          .
        </Text>
      );
    }
    if (offerStatus === OfferStatus.cavDeclined) {
      if (isCav) {
        return (
          <Text>
            {'You have declined help for '}
            {offerRequest?.title ? (
              <ReqTitle>{offerRequest.title}</ReqTitle>
            ) : (
              'a request'
            )}
            .
          </Text>
        );
      }
      return (
        <Text>
          {cavUser.displayName || cavUser.username}
          {' has declined to help in '}
          {offerRequest?.title ? (
            <ReqTitle>{offerRequest.title}</ReqTitle>
          ) : (
            'your task'
          )}
          .
        </Text>
      );
    }
  };
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <>
      <p
        style={{
          color: 'rgba(0, 0, 0, 0.45)',
          marginBottom: '4px',
          fontSize: '12px',
        }}
      >
        {`${updatedAt.toLocaleDateString(
          undefined,
          dateOptions,
        )}, ${updatedAt.toLocaleTimeString()}`}
      </p>
      <div
        style={{
          background: '#FFFFFF',
          border: `1px solid ${COLORS.strokeCards}`,
          borderRadius: '2px',
          marginTop: '4px',
          marginBottom: '14px',
          padding: '10px',
        }}
      >
        {visualizeNotification()}
      </div>
    </>
  );
};
export default Notification;
