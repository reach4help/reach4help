import { firestore } from 'firebase';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StepTracker from 'src/components/StepTracker/StepTracker';
import { ProfileState } from 'src/ducks/profile/types';
import { setRequest } from 'src/ducks/requests/actions';
import { IRequest } from 'src/models/requests';
import { IUser } from 'src/models/users';
import { MyRequestPostsLocationUrl } from 'src/modules/requests/constants';
import AuthenticationModal from 'src/pages/modals/AuthenticationModal';
import { AppState } from 'src/store';

import PostDetails from '../components/PostDetails';
import PostMap from '../components/PostMap';
import PostSummary from '../components/PostSummary';
import { IUserAddress } from 'src/models/users/privilegedInformation';
import { CreatePostTypes } from '../constants';

const CreatePostContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cancelCreate = () => {
    history.replace(MyRequestPostsLocationUrl);
  };

  const phoneNumber = useSelector(
    (state: AppState) => state.auth.user?.phoneNumber,
  );
  const onboarded = useSelector((state: AppState) => state.auth.onboarded);

  const [stepNumber, setStepNumber] = useState(0);
  const [postDetails, setPostDetails] = useState<IPostDetails>({
    title: 'Deliveries',
    body: 'Please bring me supplies',
    type: 'Deliveries',
  });

  interface IPostDetails {
    title: string;
    body: string;
    type: string;
  }

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const moveForwards = () => setStepNumber(stepNumber + 1);
  const moveBackwards = () => setStepNumber(stepNumber - 1);

  const addresses = useSelector(
    (state: AppState) => state.profile.privilegedInformation?.addresses,
  );

  const [postLocation, setPostLocation] = useState<IUserAddress>(
    addresses && Object.keys(addresses).length > 0
      ? addresses[Object.keys(addresses)[0]]
      : {
          address1: '',
          address2: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
          coords: { latitude: 0, longitude: 0 },
        },
  );

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
          onNext={moveForwards}
          handleCancel={cancelCreate}
          postDetails={postDetails}
          setPostDetails={setPostDetails}
        />
      ),
    },
    {
      title: 'Map',
      component: (
        <PostMap
          addresses={addresses}
          postLocation={postLocation}
          setPostLocation={setPostLocation}
          nextHandler={moveForwards}
          prevHandler={moveBackwards}
          postDetails={postDetails}
        />
      ),
    },
    {
      title: 'Summary',
      component: (
        <PostSummary
          onPrev={moveBackwards}
          postDetails={postDetails}
          postLocation={postLocation}
          submitRequest={submitPost}
        />
      ),
    },
  ];

  return (
    <>
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
    </>
  );
};

interface ICreatePostContainer {
  createPostType: CreatePostTypes;
}

export default CreatePostContainer;
