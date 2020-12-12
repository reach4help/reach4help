import { Button } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyRequestPostsLocationUrl } from 'src/modules/requests/constants';
import styled from 'styled-components';

import WebClientMap from '../../../components/WebClientMap/WebClientMap';
import PostConfirmation from './PostConfirmation';

const PostSummary: React.FC<PostSummaryProps> = ({
  prevHandler: onPrev,
  postDetails,
  postLocation,
  submitRequest,
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
            setShowConfirmationPage(false);
            // because I could observe race conditions in cloud function
            setTimeout(() => {
              history.replace(MyRequestPostsLocationUrl);
            }, 150);
          }}
        />
      )}
      {coords && coords.latitude !== 0 && coords.longitude !== 0 && (
        <MapWrapper>
          <WebClientMap
            destinations={[]}
            zoom={12}
            height="35%"
            origin={{ lat: coords.latitude, lng: coords.longitude }}
          />
        </MapWrapper>
      )}
      <h2>Details</h2>
      <div>
        <div> {postDetails.title} </div>
        <div> {postDetails.type}</div>
        <div> {postDetails.body} </div>
        <div> {postDetails.other}</div>
      </div>
      <h2>Location</h2>
      <div>
        <div>{postLocation.address1}</div>
        <div>{postLocation.address2}</div>
        <div>
          {postLocation.city}, {postLocation.state}
        </div>
        <div>{postLocation.country}</div>
        <div>{postLocation.postalCode}</div>
      </div>
      <Button onClick={onPrev}>Back</Button>{' '}
      <Button
        onClick={() => {
          setShowConfirmationPage(true);
          submitRequest();
        }}
      >
        Submit
      </Button>
    </>
  );
};

const MapWrapper = styled.div`
  height: 35%;
`;
interface PostSummaryProps {
  postLocation: any;
  postDetails: any;
  prevHandler: () => void;
  submitRequest: () => void;
}

export default PostSummary;
