import { ArrowLeftOutlined, StarOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import {
  AddressDisplay,
  ButtonsContainer,
  DetailsDisplay,
  DisplayButton,
  MapDisplay,
} from 'src/modules/create/components/DisplayElements';
import PostConfirmation from 'src/modules/create/components/PostConfirmationModal';
import { MyRequestPostsLocationUrl } from 'src/modules/myRequests/constants';
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

  const handleSubmit = () => {
    submitPost()
      .then(() => {
        setShowConfirmationPage(true);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error('Could not submit new Post');
      });
  };

  return (
    <>
      <MapDisplay coords={coords} />
      <TitleWithUnderline level={2}>
        {postTypePrefix} {t('modules.create.stepTitles.summary')}
      </TitleWithUnderline>
      <DetailsDisplay details={postDetails} />
      <AddressDisplay prefix={postTypePrefix} location={postLocation} />
      <ButtonsContainer>
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
      </ButtonsContainer>
      {showConfirmationPage && (
        <PostConfirmation
          showModal={showConfirmationPage}
          closeModal={() => {
            setShowConfirmationPage(false);
            history.replace(MyRequestPostsLocationUrl);
          }}
        />
      )}
    </>
  );
};

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
