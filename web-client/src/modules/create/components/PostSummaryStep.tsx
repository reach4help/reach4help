import { ArrowLeftOutlined, StarOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import {
  AddressDisplay,
  ButtonsContainer,
  ButtonsDisplay,
  DetailsDisplay,
  DisplayButton,
  MapDisplay,
} from 'src/modules/create/components/DisplayElements';
import PostConfirmation from 'src/modules/create/components/PostConfirmationModal';
import { MyRequestPostsLocationUrl } from 'src/modules/requests/constants';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const PostSummary: React.FC<PostSummaryProps> = ({
  prevHandler,
  postDetails,
  postLocation,
  submitPost,
  postTypePrefix,
}) => {
  const { t } = useTranslation();
  const { coords } = postLocation;
  const [showConfirmationPage, setShowConfirmationPage] = useState(false);
  const history = useHistory();

  const handleSubmit = () => setShowConfirmationPage(true);

  return (
    <>
      <MapDisplay coords={coords} />
      <TitleWithUnderline level={2} color={COLORS.primaryDark}>
        {postTypePrefix} {t('modules.create.postSummary.confirmation')}{' '}
      </TitleWithUnderline>
      <PostSummaryWrapper>
        <DetailsDisplay details={postDetails} />
        <AddressDisplay location={postLocation} />
      </PostSummaryWrapper>
      <ButtonsContainer>
        <ButtonsDisplay>
          <DisplayButton
            type="default"
            block
            onClick={prevHandler}
            icon={<ArrowLeftOutlined />}
          >
            {t('back')}
          </DisplayButton>

          <SubmitButton
            type="primary"
            block
            icon={<StarOutlined />}
            onClick={handleSubmit}
          >
            {t('submit')}
          </SubmitButton>
        </ButtonsDisplay>
      </ButtonsContainer>
      {showConfirmationPage && (
        <PostConfirmation
          showModal={showConfirmationPage}
          closeModal={() => {
            submitPost().then(() => {
              history.replace(MyRequestPostsLocationUrl);
            });
            setShowConfirmationPage(false);
          }}
        />
      )}
    </>
  );
};

const PostSummaryWrapper = styled.div`
  margin: 10px auto;
  width: 80%;
`;

const SubmitButton = styled(DisplayButton)`
  background: ${COLORS.stepForwardNormal} !important;
`;

interface PostSummaryProps {
  postLocation: any;
  postDetails: any;
  prevHandler: () => void;
  submitPost: () => any;
  postTypePrefix: string;
}

export default PostSummary;
