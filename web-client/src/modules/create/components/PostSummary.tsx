import { Button } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyRequestPostsLocationUrl } from 'src/modules/requests/constants';

import WebClientMap from '../../../components/WebClientMap/WebClientMap';
import PostConfirmation from './PostConfirmation';

const PostSummary: React.FC<PostSummaryProps> = ({
  onPrev,
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
            submitRequest();
          }}
        />
      )}
      {coords && coords.latitude !== 0 && coords.longitude !== 0 && (
        <div style={{ height: '450px' }}>
          <WebClientMap
            destinations={[]}
            zoom={12}
            height="450px"
            origin={{ lat: coords.latitude, lng: coords.longitude }}
          />
        </div>
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

interface PostSummaryProps {
  postLocation: any;
  postDetails: any;
  onPrev: () => void;
  submitRequest: () => void;
}

export default PostSummary;
