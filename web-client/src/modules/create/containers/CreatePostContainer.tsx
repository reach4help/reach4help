import { firestore } from 'firebase';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const getTypes = () => [t('modules.create.defaults.postDetails.type')];

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
    title: t('modules.create.defaults.postDetails.title'),
    body: t('modules.create.defaults.postDetails.body'),
    type: getTypes()[0],
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
      type:
        postDetails.type === 'customType'
          ? postDetails.customType
          : postDetails.type,
      pinUserRef: profileState.userRef!,
      pinUserSnapshot: profileState.profile!.toObject() as IUser,
      streetAddress: `${address1} ${address2} ${city} ${state} ${postalCode} ${country}`,
      latLng: new firestore.GeoPoint(coords.latitude, coords.longitude),
    };
    dispatch(setRequest(newPost as IRequest, undefined, phoneNumber));
  };

  const postCreationSteps = [
    {
      title: t('modules.create.stepTitles.details'),
      component: (
        <PostDetails
          nextHandler={moveForwards}
          prevHandler={cancelCreate}
          postTypes={getTypes()}
          postDetails={postDetails}
          setPostDetails={setPostDetails}
        />
      ),
    },
    {
      title: t('modules.create.stepTitles.map'),
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
      title: t('modules.create.stepTitles.summary'),
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
          <StepsWrapper>{postCreationSteps[stepNumber].component}</StepsWrapper>
        </>
      ) : (
        <AuthenticationModal isVisible />
      )}
    </CreatePostContainerWrapper>
  );
};

const StepsWrapper = styled.div`
  height: 100%;
  width: 80%;
  margin: 20px auto;
`;

const CreatePostContainerWrapper = styled.div`
  height: 100%;
  background-color: #f8f8f8;
`;

interface IPostDetails {
  title: string;
  body: string;
  type: string;
  customType?: string;
}

export default CreatePostContainer;
