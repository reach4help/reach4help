import { Button } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AddressDisplay,
  MapDisplay,
} from 'src/modules/create/components/DisplayElements';
import PostConfirmation from 'src/modules/create/components/PostConfirmationModal';
import { MyRequestPostsLocationUrl } from 'src/modules/requests/constants';
import styled from 'styled-components';

const PostSummary: React.FC<PostSummaryProps> = ({
  prevHandler,
  postDetails,
  postLocation,
  submitPost,
}) => {
  const { coords } = postLocation;
  const [showConfirmationPage, setShowConfirmationPage] = useState(false);
  const history = useHistory();

  return (
    <>
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
      <MapDisplay coords={coords} />
      <DetailsDiv>
        <h2>Details</h2>
        <div> {postDetails.title} </div>
        <div> {postDetails.type}</div>
        <div> {postDetails.body} </div>
        <div> {postDetails.other}</div>
      </DetailsDiv>
      <h2>Location</h2>
      <AddressDisplay location={postLocation} />
      <Button onClick={prevHandler}>Back</Button>{' '}
      <Button
        onClick={() => {
          setShowConfirmationPage(true);
        }}
      >
        Submit
      </Button>
    </>
  );
};

const DetailsDiv = styled.div``;

interface PostSummaryProps {
  postLocation: any;
  postDetails: any;
  prevHandler: () => void;
  submitPost: () => any;
}

export default PostSummary;
