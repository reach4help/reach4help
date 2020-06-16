/*  Using tabs with maps
https://stackoverflow.com/questions/32097454/google-map-is-not-working-in-my-responsive-tab
*/
import { Tabs } from 'antd';
import { Coords } from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  InformationModal,
  makeLocalStorageKey,
} from 'src/components/InformationModal/InformationModal';
import LoadingWrapper from 'src/components/LoadingComponent/LoadingComponent';
import {
  getCoordsFromProfile,
  getStreetAddressFromProfile,
} from 'src/components/WebClientMap/utils';
import Map from 'src/components/WebClientMap/WebClientMap';
import { resetSetOfferState, setOffer } from 'src/ducks/offers/actions';
import { OffersState } from 'src/ducks/offers/types';
import { ProfileState } from 'src/ducks/profile/types';
import {
  getOpenRequests,
  resetSetRequestState,
} from 'src/ducks/requests/actions';
import { RequestState } from 'src/ducks/requests/types';
import { firestore } from 'src/firebase';
import { OfferStatus } from 'src/models/offers';
import { RequestWithOffersAndTimeline } from 'src/models/requests/RequestWithOffersAndTimeline';
import { ApplicationPreference } from 'src/models/users';
import RequestItem from 'src/modules/requests/components/RequestItem/RequestItem';
import { OpenRequestsLocation } from 'src/modules/requests/pages/routes/OpenRequestsRoute/constants';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const { TabPane } = Tabs;

const FindRequestsContainer: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [expandedRequestId, setExpandedRequestId] = useState<
    string | undefined
  >(undefined);

  const profileState = useSelector(
    ({ profile }: { profile: ProfileState }) => profile,
  );

  const [bannerMessage, setBannerMessage] = useState<string | undefined>(
    getStreetAddressFromProfile(profileState),
  );

  const [currentLocation, setCurrentLocation] = useState<Coords>(() =>
    getCoordsFromProfile(profileState),
  );

  const [requestsListData, setRequestsListData] = useState<
    RequestWithOffersAndTimeline[]
  >([]);

  const [requestsGeoData, setrequestsGeoData] = useState<MapRequestProps[]>([]);

  const pendingRequestsWithOffersAndTimeline = useSelector(
    ({ requests }: { requests: RequestState }) =>
      requests.syncOpenRequestsState,
  );

  const setRequestState = useSelector(
    ({ requests }: { requests: RequestState }) => requests.setAction,
  );
  const setOfferState = useSelector(
    ({ offers }: { offers: OffersState }) => offers.setAction,
  );

  useEffect(() => {
    dispatch(resetSetRequestState());
  }, [dispatch]);

  useEffect(() => {
    if (
      (!setRequestState.loading && setRequestState.success) ||
      (!setOfferState.loading && setOfferState.success)
    ) {
      setTimeout(() => {
        history.push(OpenRequestsLocation.path);
      }, 150);
      dispatch(resetSetRequestState());
      dispatch(resetSetOfferState());
    }
  }, [setRequestState, setOfferState, dispatch, history]);

  useEffect(() => {
    if (
      profileState.profile &&
      profileState.profile.applicationPreference &&
      !pendingRequestsWithOffersAndTimeline.data &&
      !pendingRequestsWithOffersAndTimeline.loading
    ) {
      dispatch(
        getOpenRequests({
          userType: profileState.profile.applicationPreference,
          userRef: profileState.userRef,
          lat: profileState.privilegedInformation?.address.coords.latitude,
          lng: profileState.privilegedInformation?.address.coords.longitude,
        }),
      );
    }
  }, [profileState, dispatch, pendingRequestsWithOffersAndTimeline]);

  useEffect(() => {
    if (
      pendingRequestsWithOffersAndTimeline &&
      pendingRequestsWithOffersAndTimeline.data
    ) {
      const requestsData = pendingRequestsWithOffersAndTimeline.data;
      if (requestsData) {
        /* TODO:  Should be reduce */
        const keys = Object.keys(requestsData);
        const values: RequestWithOffersAndTimeline[] = [];
        for (let i = 0; i < keys.length; i++) {
          if (requestsData[keys[i]]) {
            values.push(requestsData[keys[i]]);
          }
        }

        setRequestsListData(values);
        setrequestsGeoData(
          Object.keys(requestsData).reduce(
            (acc: MapRequestProps[], curr: string) =>
              !requestsData[curr]
                ? acc
                : [
                    ...acc,
                    {
                      id: curr,
                      center: {
                        lat: requestsData[curr].latLng.latitude,
                        lng: requestsData[curr].latLng.longitude,
                      },
                    },
                  ],
            [],
          ),
        );
      }
    }
  }, [pendingRequestsWithOffersAndTimeline]);

  const onRequestHandler = (id: string) => {
    setExpandedRequestId(id);
  };

  const handleRequestForAcceptReject = (action?: boolean) => {
    if (
      expandedRequestId &&
      pendingRequestsWithOffersAndTimeline &&
      pendingRequestsWithOffersAndTimeline.data &&
      profileState.userRef &&
      profileState.profile &&
      profileState.profile.applicationPreference === ApplicationPreference.cav
    ) {
      dispatch(
        setOffer({
          cavUserRef: profileState.userRef,
          pinUserRef:
            pendingRequestsWithOffersAndTimeline.data[expandedRequestId]
              .pinUserRef,
          requestRef: firestore.collection('requests').doc(expandedRequestId),
          cavUserSnapshot: profileState.profile,
          requestSnapshot: pendingRequestsWithOffersAndTimeline.data[
            expandedRequestId
          ].getRequest(),
          message: t(
            'modules.requests.containers.FindRequestsContainer.want_to_help',
          ),
          status: action ? OfferStatus.pending : OfferStatus.cavDeclined,
        }),
      );
    }
  };

  const maybeRequestDetails = () => {
    if (
      expandedRequestId &&
      pendingRequestsWithOffersAndTimeline &&
      pendingRequestsWithOffersAndTimeline.data
    ) {
      const request =
        pendingRequestsWithOffersAndTimeline.data[expandedRequestId];
      return request ? (
        <RequestDetails>
          <RequestItem
            request={request}
            handleRequest={handleRequestForAcceptReject}
            loading={setOfferState.loading}
            isCavAndOpenRequest
          />
        </RequestDetails>
      ) : null;
    }
    return null;
  };

  const setGeocodedLocation = ({ address, latLng }) => {
    setBannerMessage(address);
    setCurrentLocation(latLng);
  };

  if (
    !pendingRequestsWithOffersAndTimeline.data ||
    pendingRequestsWithOffersAndTimeline.loading
  ) {
    return <LoadingWrapper />;
  }

  const instructions = [
    t('information_modal.FindRequestsContainer.0'),
    t('information_modal.FindRequestsContainer.1'),
    t('information_modal.FindRequestsContainer.2'),
    t('information_modal.FindRequestsContainer.3'),
    t('information_modal.FindRequestsContainer.4'),
    t('information_modal.FindRequestsContainer.5'),
    t('information_modal.FindRequestsContainer.6'),
  ];
  const instructionModalLocalStorageKey = makeLocalStorageKey({
    prefix: 'reach4help.modalSeen.FindRequestsContainer',
    userid: profileState.uid,
  });

  return (
    <>
      <Tabs defaultActiveKey="map">
        <TabPane
          tab={t(
            'modules.requests.containers.FoundRequestsContainer.FoundRequestsContainer.map_tab_label',
          )}
          key="map"
        >
          {' '}
          <div style={{ height: '600px', width: '100%' }}>
            <Map
              isCav
              destinations={requestsGeoData}
              origin={currentLocation}
              onDestinationClickedHandler={id => onRequestHandler(id)}
              onGeocode={setGeocodedLocation}
              bannerMessage={bannerMessage}
              forceRerender
            />
          </div>
          {maybeRequestDetails()}
        </TabPane>
        <TabPane
          tab={t(
            'modules.requests.containers.FoundRequestsContainer.FoundRequestsContainer.list_tab_label',
          )}
          key="list"
        >
          {requestsListData.map((request, idx) => (
            <RequestDetailsListItem key={idx}>
              <RequestItem
                request={request}
                handleRequest={handleRequestForAcceptReject}
                loading={setOfferState.loading}
                isCavAndOpenRequest
              />
            </RequestDetailsListItem>
          ))}
        </TabPane>
      </Tabs>
      <InformationModal
        title={t('information_modal.FindRequestsContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

const RequestDetails = styled.div`
  position: fixed;
  bottom: 64px;
  width: 100%;
  background: white;
`;

const RequestDetailsListItem = styled.div`
  bottom: 64px;
  width: 100%;
  background: white;
  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    background-color: ${COLORS.brandOrange};
  }
  border: 2px solid ${COLORS.brandOrange};
`;

interface MapRequestProps {
  center: Coords;
  id: string;
}

export default FindRequestsContainer;
