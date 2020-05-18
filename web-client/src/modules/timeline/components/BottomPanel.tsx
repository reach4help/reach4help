import {
  FileProtectOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RequestStatus } from 'src/models/requests';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import StarRadioGroup from '../../../components/StarRadioGroup/StarRadioGroup';

export interface FinishRequestButtonsProps {
  title: string;
  name: string;
  profilePicture: string;
  status: RequestStatus;
  rating: number | null;
  handleFinishRequest: Function;
  handleSubmitRating: (value: number) => void;
  loading: boolean;
}

const FinishRequestButtons: React.FC<FinishRequestButtonsProps> = ({
  title,
  name,
  profilePicture,
  status,
  rating,
  handleFinishRequest,
  handleSubmitRating,
  loading,
}): React.ReactElement => {
  const [value, setValue] = useState<number>(rating || 0);
  const [requestModalVisible, setRequestModalVisible] = useState<boolean>(
    false,
  );
  const [ratingModalVisible, setRatingModalVisible] = useState<boolean>(false);

  const finalRatings = Array.from({ length: value }, (_, i) => i);

  const { t } = useTranslation();

  const onFinishRequest = (): void => {
    handleFinishRequest();
    setRequestModalVisible(false);
  };

  const onSubmitRating = (): void => {
    handleSubmitRating(value);
    setRatingModalVisible(true);
  };

  return (
    <>
      {status === RequestStatus.ongoing && (
        <ButtonContainer>
          <Button>{t('timeline.cancelRequest')}</Button>

          <PrimaryButton
            onClick={(): void => setRequestModalVisible(true)}
            icon={<FileProtectOutlined />}
          >
            {t('timeline.finishRequest')}
          </PrimaryButton>
        </ButtonContainer>
      )}

      {status === RequestStatus.completed && (
        <MiddleAlignedColumn>
          <p>
            {t('timeline.ratingQuestion')} <b>{name}</b>?
          </p>

          <StarContainer>
            <StarRadioGroup rating={value} handleChange={setValue} />
          </StarContainer>

          <div>
            <PrimaryButton
              disabled={!value}
              onClick={onSubmitRating}
              icon={<StarOutlined />}
              loading={loading}
            >
              {t('timeline.submitRatingButton')}
            </PrimaryButton>
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
              {t('timeline.finishRequestModalParta')} <b>{title}</b>{' '}
              {t('timeline.finishRequestModalPartb')} {name}?
            </p>
          </div>
        </FlexDiv>

        <div>
          <ButtonRight
            onClick={onFinishRequest}
            icon={<FileProtectOutlined />}
            loading={loading}
          >
            {t('timeline.finishRequest')}
          </ButtonRight>
        </div>
      </Modal>

      <RatingModal
        visible={ratingModalVisible}
        onCancel={(): void => setRatingModalVisible(false)}
        footer={null}
      >
        <HorizontallyAlignedDiv>
          <DisplayPhoto src={profilePicture} alt="" />

          <DisplayName>{name}</DisplayName>
        </HorizontallyAlignedDiv>

        <MiddleAlignedColumn>
          <p>{t('timeline.thankYouModalTitle')}</p>

          <p>
            {t('timeline.thankYouModalBodyParta')} {name}{' '}
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
`;

const PrimaryButton = styled(Button)`
  background-color: ${COLORS.success};
  border-color: ${COLORS.success};
  color: white;

  :nth-of-type(2) {
    margin-left: 12px;
  }

  :hover {
    background-color: ${COLORS.success};
    border-color: ${COLORS.success};
    color: white;
  }

  :focus {
    background-color: ${COLORS.success};
    border-color: ${COLORS.success};
    color: white;
  }
`;

const ButtonRight = styled(PrimaryButton)`
  margin-left: auto;
  display: block;
`;

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

export default FinishRequestButtons;
