import {
  FileProtectOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StepBackButton, StepForwardButton } from 'src/components/Buttons';
import StarRadioGroup from 'src/components/StarRadioGroup/StarRadioGroup';
import { RequestStatus } from 'src/models/requests';
import { RequestWithOffersAndTimeline } from 'src/models/requests/RequestWithOffersAndTimeline';
import { User } from 'src/models/users';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

export interface TimelineActionsProps {
  request: RequestWithOffersAndTimeline;
  currentUser: User;
  handleRequest: ({
    status,
    pinRating,
    cavRating,
  }: {
    status?: RequestStatus;
    pinRating?: number;
    cavRating?: number;
  }) => void;
  isCav: boolean;
}

const BottomPanel: React.FC<TimelineActionsProps> = ({
  request,
  currentUser,
  handleRequest,
  isCav,
}): React.ReactElement => {
  const [rating, setRating] = useState<number>(0);
  const [requestModalVisible, setRequestModalVisible] = useState<boolean>(
    false,
  );
  const [ratingModalVisible, setRatingModalVisible] = useState<boolean>(false);
  const [showRating, setShowRating] = useState<boolean>(false);

  const finalRatings = Array.from({ length: rating }, (_, i) => i);

  const { t } = useTranslation();

  const onFinishRequest = (): void => {
    setShowRating(true);
    setRequestModalVisible(false);
  };

  const onSubmitRating = (): void => {
    if (isCav) {
      handleRequest({ pinRating: rating });
    } else {
      handleRequest({ cavRating: rating, status: RequestStatus.completed });
    }
    setRatingModalVisible(true);
  };

  const finishedRequest =
    !request.cavRating &&
    request.pinRating &&
    request.status === RequestStatus.ongoing;

  return (
    <>
      {!showRating &&
        !finishedRequest &&
        request.status === RequestStatus.ongoing &&
        isCav && (
          <ButtonContainer>
            <StepBackButton
              onClick={() => handleRequest({ status: RequestStatus.cancelled })}
            >
              {t('timeline.cancelRequest')}
            </StepBackButton>
            {isCav && (
              <StepForwardButton
                onClick={(): void => setRequestModalVisible(true)}
                icon={<FileProtectOutlined />}
              >
                {t('timeline.finishRequest')}
              </StepForwardButton>
            )}
          </ButtonContainer>
        )}

      {request.status === RequestStatus.pending && !isCav && (
        <ButtonContainer>
          <StepBackButton
            onClick={() => handleRequest({ status: RequestStatus.cancelled })}
          >
            {t('timeline.cancelRequest')}
          </StepBackButton>
        </ButtonContainer>
      )}

      {(showRating || (finishedRequest && !isCav)) && (
        <MiddleAlignedColumn>
          <p>
            {t('timeline.ratingQuestion')}{' '}
            <b>
              {isCav
                ? request.pinUserSnapshot.displayName
                : request.cavUserSnapshot?.displayName}
            </b>
            ?
          </p>

          <StarContainer>
            <StarRadioGroup rating={rating} handleChange={setRating} />
          </StarContainer>

          <div>
            <StepForwardButton
              disabled={!rating}
              onClick={onSubmitRating}
              icon={<StarOutlined />}
            >
              {t('timeline.submitRatingButton')}
            </StepForwardButton>
          </div>
        </MiddleAlignedColumn>
      )}

      <Modal
        visible={requestModalVisible}
        onCancel={(): void => setRequestModalVisible(false)}
        footer={null}
      >
        <FlexDiv>
          <ModalLogo />

          <div>
            <h2>{t('timeline.finishRequest')}</h2>

            <p>
              {t('timeline.finishRequestModalParta')} <b>{request.title}</b>{' '}
              {t('timeline.finishRequestModalPartb')} {currentUser.displayName}?
            </p>
          </div>
        </FlexDiv>

        <div>
          <StepForwardButton
            onClick={onFinishRequest}
            icon={<FileProtectOutlined />}
          >
            {t('timeline.finishRequest')}
          </StepForwardButton>
        </div>
      </Modal>

      <RatingModal
        visible={ratingModalVisible}
        onCancel={(): void => setRatingModalVisible(false)}
        footer={null}
      >
        <HorizontallyAlignedDiv>
          <DisplayPhoto src={currentUser.displayPicture || undefined} alt="" />

          <DisplayName>{currentUser.displayName}</DisplayName>
        </HorizontallyAlignedDiv>

        <MiddleAlignedColumn>
          <p>{t('timeline.thankYouModalTitle')}</p>

          <p>
            {t('timeline.thankYouModalBodyParta')} {currentUser.displayName}{' '}
            {t('timeline.thankYouModalBodyPartb')}:
          </p>

          <div aria-label={`${finalRatings.length} out of 5 stars`}>
            {finalRatings.map(ratingInternal => (
              <Star key={ratingInternal} />
            ))}
          </div>
        </MiddleAlignedColumn>
      </RatingModal>
    </>
  );
};

const FlexDiv = styled.div`
  display: flex;
`;

const HorizontallyAlignedDiv = styled(FlexDiv)`
  align-items: center;
`;

const MiddleAlignedColumn = styled(HorizontallyAlignedDiv)`
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled(FlexDiv)`
  justify-content: center;
  width: 100%;
  padding: 15px;

  button {
    width: 100%;
  }
`;
/* TODO:  Check if there is any useful code here
This was the original code but wasn't working well.
PrimaryButton has been replaced with ButtonForward

const PrimaryButton = styled(Button)`
  background-color: ${COLORS.success};
  border-color: ${COLORS.success};
  color: white;

  &:nth-of-type(2) {
    margin-left: 12px;
  }

  &:hover {
    background-color: ${COLORS.success};
    border-color: ${COLORS.success};
    color: white;
  }

  &:focus {
    background-color: ${COLORS.success};
    border-color: ${COLORS.success};
    color: white;
  }
`;
*/
const StarContainer = styled('div')`
  padding-bottom: 1em;
`;

const ModalLogo = styled(FileProtectOutlined)`
  color: ${COLORS.success};
  padding-right: 24px;
  font-size: 20px;
`;

const DisplayPhoto = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: darkgray;
  margin-right: 16px;
`;

const DisplayName = styled.p`
  font-size: 20px;
`;

const Star = styled(StarFilled)`
  margin: 0 4px;
  color: ${COLORS.secondaryLight};
  font-size: 20px;
`;

const RatingModal = styled(Modal)`
  div:first-child {
    padding-bottom: 0.5em;
  }

  p {
    margin-bottom: 0.5em;
  }
`;

export default BottomPanel;
