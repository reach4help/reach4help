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
import NewAddressModal from 'src/modules/create/components/NewAddressModal';
import PostDetailsStep from 'src/modules/create/components/PostDetailsStep';
import PostLocationStep from 'src/modules/create/components/PostLocationStep';
import PostSummary from 'src/modules/create/components/PostSummaryStep';
import { MyRequestPostsLocationUrl } from 'src/modules/requests/constants';
import AuthenticationModal from 'src/pages/modals/AuthenticationModal';
import { AppState } from 'src/store';
import styled from 'styled-components';

const CreatePostContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

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

    // eslint-disable-next-line no-console
    console.log('creating post', newPost, 'type', newPost.type);
    return dispatch(setRequest(newPost as IRequest, undefined, phoneNumber));
  };
  const cancelCreate = () => {
    history.replace(MyRequestPostsLocationUrl);
  };

  const postCreationSteps = [
    {
      title: t('modules.create.stepTitles.details'),
      component: (
        <PostDetailsStep
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
        <PostLocationStep
          setShowNewAddressModal={setShowNewAddressModal}
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
          submitPost={submitPost}
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

export default CreatePostContainer;
