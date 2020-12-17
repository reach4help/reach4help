import { firestore } from 'firebase';
import { Coords } from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  InformationModal,
  makeLocalStorageKey,
} from 'src/components/Modals/OneTimeModal';
import {
  getCoordsFromProfile,
  getStreetAddressFromProfile,
} from 'src/components/WebClientMap/utils';
import Map from 'src/components/WebClientMap/WebClientMap';
import { resetSetRequestState, setRequest } from 'src/ducks/posts/actions';
import { PostState } from 'src/ducks/posts/types';
import { ProfileState } from 'src/ducks/profile/types';
import { IPost, Post, PostStatus } from 'src/models/Post';
import { IUser } from 'src/models/users';
import { MyRequestPostsLocationUrl } from 'src/modules/MyPosts/constants';
import AuthenticationModal from 'src/pages/modals/AuthenticationModal';
import { AppState } from 'src/store';
import styled from 'styled-components';

import NewPost from '../components/NewPost';
import PostConfirmation from '../components/PostConfirmation';
import PostReview, { RequestInput } from '../components/PostReview';
import { CreatePostTypes } from '../constants';

/* TODO:  integrate with translation if safe */
const DELIVERIES = 'Deliveries';

// TS interfaces for state later on.

// enum Type {
//   delivery = 'Deliveries',
//   other = 'Other',
// }

// interface RequestDetails {
//   title: string;
//   type: Type;
//   details: string;
// }

// interface RequestAddress {
//   streetAddress: string;
//   latLng: firestore.GeoPoint;
// }

const CreatePostContainer: React.FC<ICreatePostContainer> = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [requestInfo, setRequestInfo] = useState<RequestInput | undefined>(
    undefined,
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [showReviewPage, setShowReviewPage] = useState<boolean>(false);

  const [showConfirmationPage, setShowConfirmationPage] = useState<boolean>(
    false,
  );

  const [authModalIsVisible, setAuthModalIsVisible] = useState<boolean>(false);

  const onboarded = useSelector((state: AppState) => state.auth.onboarded);

  const phoneNumber = useSelector(
    (state: AppState) => state.auth.user?.phoneNumber,
  );

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  // *** new state to be implemented later on ***

  // const [requestDetails, setRequestDetails] = useState<RequestDetails>({
  //   title: '',
  //   type: Type.delivery,
  //   details: '',
  // });

  // const coordsFromProfile = getCoordsFromProfile(profileState);

  // const [requestAddress, setRequestAddress] = useState<RequestAddress>({
  //   streetAddress: getStreetAddressFromProfile(profileState) || 'Address could not be found',
  //   latLng: new firestore.GeoPoint(coordsFromProfile.lat, coordsFromProfile.lng),
  // });

  const [mapAddress, setMapAddress] = useState<string>(
    () =>
      getStreetAddressFromProfile(profileState) || 'Address could not be found',
  );

  const [currentLocation, setCurrentLocation] = useState<Coords>(() =>
    getCoordsFromProfile(profileState),
  );

  const newPostState = useSelector(
    ({ posts }: { posts: PostState }) => posts.setAction,
  );

  const newPostTemp = useSelector(
    ({ posts }: { posts: PostState }) => posts.newRequestTemp,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      newPostTemp?.requestPayload &&
      newPostTemp.requestPayload instanceof Post &&
      !newPostTemp?.requestId &&
      phoneNumber &&
      !newPostState.loading &&
      !newPostState.success
    ) {
      dispatch(
        setRequest(
          newPostTemp.requestPayload.toObject() as IPost,
          undefined,
          phoneNumber,
        ),
      );
    }
  }, [phoneNumber, newPostTemp, dispatch, newPostState]);

  useEffect(() => {
    if (newPostTemp && newPostTemp.requestPayload) {
      setRequestInfo({
        type:
          newPostTemp.requestPayload.title === DELIVERIES
            ? newPostTemp.requestPayload.title
            : 'Other',
        streetAddress: newPostTemp.requestPayload.streetAddress,
        description: newPostTemp.requestPayload.description,
        other: newPostTemp.requestPayload.title,
      });
      setShowReviewPage(true);
    }
  }, [newPostTemp]);

  useEffect(() => {
    if (newPostState.success) {
      setShowConfirmationPage(true);
    }
  }, [newPostState, dispatch]);

  const reviewRequestSubmitHandler = request => {
    if (onboarded) {
      const title = request.type === DELIVERIES ? request.type : request.other;

      dispatch(
        setRequest(
          {
            isResponse: false,
            requestingHelp: true,
            parentSnapshot: null,
            parentRef: null,
            status: PostStatus.open,
            creatorGivenRating: 0,
            parentCreatorGivenRating: 0,
            updateSeenBy: [],
            creatorRatedAt: null,
            parentCreatorRatedAt: null,
            positiveResponseCount: 0,
            negativeResponseCount: 0,
            title,
            description: request.description,
            creatorRef: profileState.userRef!,
            streetAddress:
              mapAddress ||
              t(
                'modules.requests.containers.NewRequestsContainer.address_error',
              ),
            creatorSnapshot: profileState.profile!.toObject() as IUser,
            latLng: new firestore.GeoPoint(
              currentLocation.lat,
              currentLocation.lng,
            ),
          },
          undefined,
          phoneNumber,
        ),
      );
      setIsSubmitting(true);
    } else {
      setAuthModalIsVisible(true);
    }
  };

  const newRequestSubmitHandler = (
    type: string,
    body: string,
    address: string,
    other: string,
  ) => {
    /*    const { t } = useTranslation(); */

    setRequestInfo({
      type,
      streetAddress: address,
      description: body,
      other,
    });
    setShowReviewPage(true);
  };

  const [startLocateMe, setStartLocateMe] = useState<boolean>(false);

  const [startGeocode, setStartGeocode] = useState<boolean>(false);
  const setGeocodedLocation = ({ address, latLng }) => {
    setStartGeocode(false);
    setStartLocateMe(false);
    setMapAddress(address);
    setCurrentLocation(latLng);
  };

  const onGoBack = () => setShowReviewPage(false);

  const maybeNewRequest = () => {
    if (!showReviewPage) {
      const request = {
        streetAddress: mapAddress,
        type: requestInfo ? requestInfo.type : DELIVERIES,
        other: requestInfo ? requestInfo.other : '',
        description: requestInfo ? requestInfo.description : '',
      };

      return (
        <RequestDetails>
          <NewPost
            onSubmit={newRequestSubmitHandler}
            request={request}
            setStreetAddress={setMapAddress}
            setMapAddress={() => setStartGeocode(true)}
            setMyLocation={() => setStartLocateMe(true)}
          />
        </RequestDetails>
      );
    }
  };

  const maybeRequestReview = () => {
    if (showReviewPage && requestInfo) {
      return (
        <RequestDetails>
          <PostReview
            request={requestInfo}
            saveRequest={() => {
              reviewRequestSubmitHandler(requestInfo);
            }}
            isSubmitting={isSubmitting}
            goBack={onGoBack}
          />
        </RequestDetails>
      );
    }
  };

  const maybeRequestConfirmation = () => {
    if (showConfirmationPage) {
      return (
        <PostConfirmation
          showModal={showConfirmationPage}
          closeModal={() => {
            setShowConfirmationPage(false);
            // because I could observe race conditions in cloud function
            setTimeout(() => {
              history.replace(MyRequestPostsLocationUrl);
            }, 150);
            dispatch(resetSetRequestState());
          }}
        />
      );
    }
  };

  const instructions = [
    t('information_modal.NewRequestsContainer.0'),
    t('information_modal.NewRequestsContainer.1'),
    t('information_modal.NewRequestsContainer.2'),
    t('information_modal.NewRequestsContainer.3'),
    t('information_modal.NewRequestsContainer.4'),
  ];
  const instructionModalLocalStorageKey = makeLocalStorageKey({
    prefix: 'reach4help.modalSeen.NewRequestsContainer',
    userid: profileState.uid,
  });

  return (
    <div style={{ height: '100%' }}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'stretch',
          flexDirection: 'column',
        }}
      >
        <MapContainer>
          <Map
            isCav={false}
            destinations={[]}
            origin={currentLocation}
            onGeocode={setGeocodedLocation}
            address={mapAddress}
            startGeocode={startGeocode}
            startLocateMe={startLocateMe}
          />
        </MapContainer>
        <div style={{ height: '100%' }}>
          {maybeNewRequest()}
          {maybeRequestReview()}
          {maybeRequestConfirmation()}
        </div>
      </div>
      <InformationModal
        title={t('information_modal.NewRequestsContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
      {!onboarded && <AuthenticationModal isVisible={authModalIsVisible} />}
    </div>
  );
};

const RequestDetails = styled.div`
  width: 100%;
  background: white;
`;

const MapContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;
`;

interface ICreatePostContainer {
  createPostType: CreatePostTypes;
}

export default CreatePostContainer;
