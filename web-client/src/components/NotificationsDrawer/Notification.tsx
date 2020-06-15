import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { OfferStatus } from 'src/models/offers';
import { Request } from 'src/models/requests';
import { User } from 'src/models/users';
import { TimelineViewLocation } from 'src/modules/timeline/pages/routes/TimelineViewRoute/constants';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const Notification: React.FC<NotificationProps> = ({
  cavUser,
  offerStatus,
  offerRequest,
  requestRef,
  updatedAt,
  isCav,
}): React.ReactElement => {
  const { t } = useTranslation();
  const history = useHistory();
  const visualizeNotification = () => {
    if (offerStatus === OfferStatus.accepted) {
      if (isCav) {
        return (
          <RequestNotification>
            {offerRequest?.pinUserSnapshot.displayName ||
              offerRequest?.pinUserSnapshot.username ||
              t('components.notification.request_author')}
            {t('components.notification.volunteer_accepted')}
            {offerRequest?.title ? (
              <RequestTitle>{offerRequest.title}</RequestTitle>
            ) : (
              'a request'
            )}
            .
          </RequestNotification>
        );
      }
      return (
        <RequestNotification>
          {t('components.notification.pin_accepted')}
          {cavUser.displayName || cavUser.username}
          {t('for')}
          {offerRequest?.title ? (
            <RequestTitle>{offerRequest.title}</RequestTitle>
          ) : (
            t('components.notification.your_task')
          )}
          .
        </RequestNotification>
      );
    }
    if (offerStatus === OfferStatus.rejected) {
      if (isCav) {
        return (
          <RequestNotification>
            {offerRequest?.pinUserSnapshot.displayName ||
              offerRequest?.pinUserSnapshot.username ||
              `${t('components.notification.request_author')} ${t(
                'components.notification.already_helped',
              )}`}
            {offerRequest?.title ? (
              <RequestTitle>{offerRequest.title}</RequestTitle>
            ) : (
              t('components.notification.a_request')
            )}
            .
          </RequestNotification>
        );
      }
      return (
        <RequestNotification>
          {t('components.notification.pin_rejected')}
          {cavUser.displayName || cavUser.username}
          {t('for')}
          {offerRequest?.title ? (
            <RequestTitle>{offerRequest.title}</RequestTitle>
          ) : (
            t('components.notification.your_task')
          )}
          .
        </RequestNotification>
      );
    }
    if (offerStatus === OfferStatus.pending) {
      if (isCav) {
        return (
          <RequestNotification>
            {t('components.notification.cav_offer')}
            {offerRequest?.title ? (
              <RequestTitle>{offerRequest.title}</RequestTitle>
            ) : (
              t('components.notification.a_request')
            )}
            .
          </RequestNotification>
        );
      }
      return (
        <RequestNotification>
          {cavUser.displayName || cavUser.username}
          {t('components.notification.offered_help')}
          {offerRequest?.title ? (
            <RequestTitle>{offerRequest.title}</RequestTitle>
          ) : (
            t('components.notification.your_task')
          )}
          .
        </RequestNotification>
      );
    }
    if (offerStatus === OfferStatus.cavDeclined) {
      if (isCav) {
        return (
          <RequestNotification>
            {t('components.notification.pin_declined_help')}
            {offerRequest?.title ? (
              <RequestTitle>{offerRequest.title}</RequestTitle>
            ) : (
              t('components.notification.a_request')
            )}
            .
          </RequestNotification>
        );
      }
      return (
        <RequestNotification>
          {cavUser.displayName || cavUser.username}
          {t('components.notification.cav_declined_help')}
          {offerRequest?.title ? (
            <RequestTitle>{offerRequest.title}</RequestTitle>
          ) : (
            t('components.notification.your_task')
          )}
          .
        </RequestNotification>
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
        <div
          onClick={() => {
            history.push(
              TimelineViewLocation.toUrl({ requestId: requestRef.id }),
            );
          }}
        >
          {visualizeNotification()}
        </div>
      </div>
    </>
  );
};

const RequestNotification = styled.p`
  margin-bottom: 0px;
`;
const RequestTitle = styled.span`
  color: ${COLORS.brandOrange};
`;

interface NotificationProps {
  cavUser: User;
  offerStatus: OfferStatus;
  offerRequest: Request | null;
  requestRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  updatedAt: Date;
  isCav?: boolean;
}

export default Notification;
