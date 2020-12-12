import { firestore } from 'firebase';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StepTracker from 'src/components/StepTracker/StepTracker';
import { ProfileState } from 'src/ducks/profile/types';
import { setRequest } from 'src/ducks/requests/actions';
import { IRequest } from 'src/models/requests';
import { IUser } from 'src/models/users';
import { IUserAddress } from 'src/models/users/privilegedInformation';
import { MyRequestPostsLocationUrl } from 'src/modules/requests/constants';
import AuthenticationModal from 'src/pages/modals/AuthenticationModal';
import { AppState } from 'src/store';
import styled from 'styled-components';

import PostDetails from '../components/PostDetails';
import PostMap from '../components/PostMap';
import PostSummary from '../components/PostSummary';

const CreatePostContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const defaultUserAddress = {
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    coords: new firestore.GeoPoint(0, 0),
  };

  const phoneNumber = useSelector(
    (state: AppState) => state.auth.user?.phoneNumber,
  );

  const onboarded = useSelector((state: AppState) => state.auth.onboarded);
  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const addresses = useSelector(
    (state: AppState) => state.profile.privilegedInformation?.addresses,
  );

  const [stepNumber, setStepNumber] = useState(0);
  const [postDetails, setPostDetails] = useState<IPostDetails>({
    title: 'Deliveries',
    body: 'Please bring me supplies',
    type: 'Deliveries',
  });
  const [postLocation, setPostLocation] = useState<IUserAddress>(
    addresses && Object.keys(addresses).length > 0
      ? addresses[Object.keys(addresses)[0]]
      : defaultUserAddress,
  );

  const moveForwards = () => setStepNumber(stepNumber + 1);
  const moveBackwards = () => setStepNumber(stepNumber - 1);
  const cancelCreate = () => {
    history.replace(MyRequestPostsLocationUrl);
  };
  const submitPost = () => {
    const { title, body } = postDetails;
    const {
      address1,
      address2,
      city,
      state,
      postalCode,
      country,
      coords,
    } = postLocation;
    const newPost = {
      title,
      description: body,
      pinUserRef: profileState.userRef!,
      pinUserSnapshot: profileState.profile!.toObject() as IUser,
      streetAddress: `${address1} ${address2} ${city} ${state} ${postalCode} ${country}`,
      latLng: new firestore.GeoPoint(coords.latitude, coords.longitude),
    };
    dispatch(setRequest(newPost as IRequest, undefined, phoneNumber));
  };

  const postCreationSteps = [
    {
      title: 'Details',
      component: (
        <PostDetails
          nextHandler={moveForwards}
          prevHandler={cancelCreate}
          postDetails={postDetails}
          setPostDetails={setPostDetails}
        />
      ),
    },
    {
      title: 'Map',
      component: (
        <PostMap
          nextHandler={moveForwards}
          prevHandler={moveBackwards}
          postDetails={postDetails}
          addresses={addresses}
          postLocation={postLocation}
          setPostLocation={setPostLocation}
        />
      ),
    },
    {
      title: 'Summary',
      component: (
        <PostSummary
          prevHandler={moveBackwards}
          postDetails={postDetails}
          postLocation={postLocation}
          submitRequest={submitPost}
        />
      ),
    },
  ];

  return (
    <CreatePostContainerWrapper>
      {onboarded ? (
        <>
          <StepTracker
            currentStep={stepNumber}
            stepTitles={postCreationSteps.map(s => s.title)}
          />
          {postCreationSteps[stepNumber].component}
        </>
      ) : (
        <AuthenticationModal isVisible />
      )}
    </CreatePostContainerWrapper>
  );
};

const CreatePostContainerWrapper = styled.div`
  height: 100%;
  background-color: #f8f8f8;
`;

interface IPostDetails {
  title: string;
  body: string;
  type: string;
}

export default CreatePostContainer;
