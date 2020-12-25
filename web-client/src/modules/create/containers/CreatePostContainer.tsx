import { firestore } from 'firebase';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StepTracker from 'src/components/StepTracker/StepTracker';
import { setRequest } from 'src/ducks/myRequests/actions';
import { ProfileState } from 'src/ducks/profile/types';
import { IPost, PostStatus } from 'src/models/posts';
import { IUser } from 'src/models/users';
import { IUserAddress } from 'src/models/users/privilegedInformation';
import { MyRequestPostsLocationUrl } from 'src/modules/allMyRequests/constants';
import NewAddressModal from 'src/modules/create/components/NewAddressModal';
import PostDetailsStep from 'src/modules/create/components/PostDetailsStep';
import PostLocationStep from 'src/modules/create/components/PostLocationStep';
import PostSummary from 'src/modules/create/components/PostSummaryStep';
import AuthenticationModal from 'src/pages/modals/AuthenticationModal';
import { AppState } from 'src/store';
import styled from 'styled-components';

import { CreatePostTypes } from '../constants';

const CreatePostContainer: React.FC<ICreatePostContainer> = ({
  createPostType,
}) => {
  const { t } = useTranslation();

  const IS_OFFER_POST = createPostType === CreatePostTypes.offer;
  const POST_TYPE_PREFIX = IS_OFFER_POST ? t('Offer') : t('Request');

  const dispatch = useDispatch();
  const history = useHistory();

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );
  const phoneNumber = useSelector(
    (state: AppState) => state.auth.user?.phoneNumber,
  );
  const onboarded = useSelector((state: AppState) => state.auth.onboarded);

  /* steps */
  const [stepNumber, setStepNumber] = useState(0);
  const moveForwards = () => setStepNumber(stepNumber + 1);
  const moveBackwards = () => setStepNumber(stepNumber - 1);

  /* PostDetails */
  const getTypes = () => [t('modules.create.defaults.postDetails.type')];
  const [postDetails, setPostDetails] = useState<IPostDetails>({
    title: '',
    body: '',
    type: '',
  });

  /* PostLocation */
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
  const addresses = useSelector(
    (state: AppState) => state.profile.privilegedInformation?.addresses,
  );
  const [postLocation, setPostLocation] = useState<IUserAddress>(
    addresses && Object.keys(addresses).length > 0
      ? addresses[Object.keys(addresses)[0]]
      : defaultUserAddress,
  );

  /* NewAddressModal */
  const [showNewAddressModal, setShowNewAddressModal] = useState<boolean>(
    false,
  );
  const [geocodeFailed, setGeocodeFailed] = useState<boolean>(false);
  const onGeocodeFail = () => {
    setGeocodeFailed(true);
  };
  const newAddressModalSuccess = value => {
    setPostLocation(value);
    setShowNewAddressModal(false);
    setGeocodeFailed(false);
  };
  const closeNewAddressModal = () => {
    setShowNewAddressModal(false);
    setGeocodeFailed(false);
  };

  /* CreatePost */
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
    if (profileState.profile) {
      const newPost = {
        isResponse: false,
        requestingHelp: true,
        parentSnapshot: null,
        parentRef: null,
        status: PostStatus.pending,
        creatorGivenRating: 0,
        parentCreatorGivenRating: 0,
        updateSeenBy: [],
        creatorRatedAt: null,
        parentCreatorRatedAt: null,
        positiveResponseCount: 0,
        negativeResponseCount: 0,
        title,
        body,
        description: '', // request.description,
        creatorRef: profileState.userRef,
        streetAddress: `${address1} ${address2} ${city} ${state} ${postalCode} ${country}`,
        latLng: new firestore.GeoPoint(coords.latitude, coords.longitude),
        creatorSnapshot: profileState.profile.toObject() as IUser,
      };
      return dispatch(setRequest(newPost as IPost, undefined, phoneNumber));
    }
  };

  const cancelCreate = () => {
    history.replace(MyRequestPostsLocationUrl);
  };

  const postCreationSteps = [
    {
      title: `${POST_TYPE_PREFIX} ${t('modules.create.stepTitles.details')}`,
      component: (
        <PostDetailsStep
          nextHandler={moveForwards}
          prevHandler={cancelCreate}
          postTypes={getTypes()}
          postDetails={postDetails}
          setPostDetails={setPostDetails}
          postTypePrefix={POST_TYPE_PREFIX}
        />
      ),
    },
    {
      title: `${POST_TYPE_PREFIX} ${t('modules.create.stepTitles.map')}`,
      component: (
        <PostLocationStep
          setShowNewAddressModal={setShowNewAddressModal}
          nextHandler={moveForwards}
          prevHandler={moveBackwards}
          addresses={addresses}
          postLocation={postLocation}
          setPostLocation={setPostLocation}
          postTypePrefix={POST_TYPE_PREFIX}
        />
      ),
    },
    {
      title: `${POST_TYPE_PREFIX} ${t('modules.create.stepTitles.summary')}`,
      component: (
        <PostSummary
          prevHandler={moveBackwards}
          postDetails={postDetails}
          postLocation={postLocation}
          submitPost={submitPost}
          postTypePrefix={POST_TYPE_PREFIX}
        />
      ),
    },
  ];

  return !onboarded ? (
    <AuthenticationModal isVisible />
  ) : (
    <CreatePostContainerWrapper>
      <StepTracker
        currentStep={stepNumber}
        stepTitles={postCreationSteps.map(s => s.title)}
      />
      <StepsWrapper>{postCreationSteps[stepNumber].component}</StepsWrapper>
      <NewAddressModal
        visible={showNewAddressModal}
        closeModal={closeNewAddressModal}
        modalSuccess={newAddressModalSuccess}
        onGeocodeFail={onGeocodeFail}
        geocodeFailed={geocodeFailed}
      />
    </CreatePostContainerWrapper>
  );
};

const StepsWrapper = styled.div`
  height: calc(100%-98px);
  width: 100%;
  margin: 0 auto;
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

interface ICreatePostContainer {
  createPostType: CreatePostTypes;
}
export default CreatePostContainer;
