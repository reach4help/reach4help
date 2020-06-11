import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const visualizeNotification = () => {
    if (offerStatus === OfferStatus.accepted) {
      if (isCav) {
        return (
          <Text>
            {offerRequest?.pinUserSnapshot.displayName ||
              offerRequest?.pinUserSnapshot.username ||
              t('components.notification.request_author')}
            {t('components.notification.volunteer_accepted')}
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
          {t('components.notification.pin_accepted')}
          {cavUser.displayName || cavUser.username}
          {t('for')}
          {offerRequest?.title ? (
            <ReqTitle>{offerRequest.title}</ReqTitle>
          ) : (
            t('components.notification.your_task')
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
              `${t('components.notification.request_author')} ${t(
                'components.notification.already_helped',
              )}`}
            {offerRequest?.title ? (
              <ReqTitle>{offerRequest.title}</ReqTitle>
            ) : (
              t('components.notification.a_request')
            )}
            .
          </Text>
        );
      }
      return (
        <Text>
          {t('components.notification.pin_rejected')}
          {cavUser.displayName || cavUser.username}
          {t('for')}
          {offerRequest?.title ? (
            <ReqTitle>{offerRequest.title}</ReqTitle>
          ) : (
            t('components.notification.your_task')
          )}
          .
        </Text>
      );
    }
    if (offerStatus === OfferStatus.pending) {
      if (isCav) {
        return (
          <Text>
            {t('components.notification.cav_offer')}
            {offerRequest?.title ? (
              <ReqTitle>{offerRequest.title}</ReqTitle>
            ) : (
              t('components.notification.a_request')
            )}
            .
          </Text>
        );
      }
      return (
        <Text>
          {cavUser.displayName || cavUser.username}
          {t('components.notification.offered_help')}
          {offerRequest?.title ? (
            <ReqTitle>{offerRequest.title}</ReqTitle>
          ) : (
            t('components.notification.your_task')
          )}
          .
        </Text>
      );
    }
    if (offerStatus === OfferStatus.cavDeclined) {
      if (isCav) {
        return (
          <Text>
            {t('components.notification.pin_declined_help')}
            {offerRequest?.title ? (
              <ReqTitle>{offerRequest.title}</ReqTitle>
            ) : (
              t('components.notification.a_request')
            )}
            .
          </Text>
        );
      }
      return (
        <Text>
          {cavUser.displayName || cavUser.username}
          {t('components.notification.cav_declined_help')}
          {offerRequest?.title ? (
            <ReqTitle>{offerRequest.title}</ReqTitle>
          ) : (
            t('components.notification.your_task')
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
