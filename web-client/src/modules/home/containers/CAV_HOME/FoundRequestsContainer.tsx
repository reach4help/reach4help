import { List, Tabs } from 'antd';
import { Coords } from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { firestore } from 'src/firebase';
import { OfferStatus } from 'src/models/offers';
import { ApplicationPreference } from 'src/models/users';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import {
  InformationModal,
  makeLocalStorageKey,
} from '../../../../components/InformationModal/InformationModal';
import LoadingWrapper from '../../../../components/LoadingComponent/LoadingComponent';
import {
  getCoordsFromProfile,
  getStreetAddressFromProfile,
} from '../../../../components/WebClientMap/utils';
import Map from '../../../../components/WebClientMap/WebClientMap';
import { resetSetOfferState, setOffer } from '../../../../ducks/offers/actions';
import { OffersState } from '../../../../ducks/offers/types';
import { ProfileState } from '../../../../ducks/profile/types';
import {
  getOpenRequests,
  resetSetRequestState,
} from '../../../../ducks/requests/actions';
import { RequestState } from '../../../../ducks/requests/types';
import { RequestWithOffersAndTimeline } from '../../../../models/requests/RequestWithOffersAndTimeline';
import RequestItem from '../../../requests/components/RequestItem/RequestItem';
import { OpenRequestsLocation } from '../../../requests/pages/routes/OpenRequestsRoute/constants';

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

  const setOfferState = useSelector(
    ({ offers }: { offers: OffersState }) => offers.setAction,
  );

  useEffect(() => {
    /*
     *
     * We needed to ensure that stale data is not present whenever someone returns to this page from somewhere else
     * So we chose to reset the redux state whenever this page is loaded
     * However, when an offer was rejected, this page was remounted and due to state changes, this effect was invoked multiple times
     * This caused unpredictable behaviour such as multiple calls to the get sync open requests API
     * which led to invalid data as the data wasn't updated in the backend fully
     * This check therefore enables us to ensure that the action to set the offer is completed before we reset it
     * We can identify that the offer made was for helping with the request by looking at the value of success.
     * The value of success is 1 if the offer was made to help and 2 if the CAV declined
     *
     * This useEffect also handles the case when an offer to help is made for a request
     * This logic was in another useEffect earlier but has been moved here as it made more sense to be here
     *
     */
    if (!setOfferState.loading) {
      if (!setOfferState.success || setOfferState.success === 2) {
        dispatch(resetSetRequestState());
      } else if (setOfferState.success && setOfferState.success === 1) {
        setTimeout(() => {
          history.push(OpenRequestsLocation.path);
        }, 150);
        dispatch(resetSetRequestState());
        dispatch(resetSetOfferState());
      }
    }
  }, [dispatch, history, setOfferState]);

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
  }, [
    profileState,
    dispatch,
    pendingRequestsWithOffersAndTimeline,
    setOfferState,
  ]);

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
      <StyledTabs defaultActiveKey="map">
        <StyledTabPane
          tab={t(
            'modules.requests.containers.FoundRequestsContainer.FoundRequestsContainer.map_tab_label',
          )}
          key="map"
        >
          <div
            style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
          >
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
        </StyledTabPane>
        <StyledTabPane
          tab={t(
            'modules.requests.containers.FoundRequestsContainer.FoundRequestsContainer.list_tab_label',
          )}
          key="list"
          style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
        >
          {' '}
          {requestsListData && requestsListData.length ? (
            <List>
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
            </List>
          ) : (
            <NoRequestsDiv>
              {t(
                'modules.requests.containers.FoundRequestsContainer.FoundRequestsContainer.no_requests',
              )}
            </NoRequestsDiv>
          )}
        </StyledTabPane>
      </StyledTabs>
      <InformationModal
        title={t('information_modal.FindRequestsContainer.title')}
        localStorageKey={instructionModalLocalStorageKey}
        instructions={instructions}
      />
    </>
  );
};

const NoRequestsDiv = styled.div`
  font-size: 28px;
  background: white;
  width: 50%;
  margin: 50 auto 100 auto;
`;

const StyledTabs = styled(Tabs)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .ant-tabs-content-holder {
    display: flex;
  }
`;

const StyledTabPane = styled(TabPane)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const RequestDetails = styled.div`
  position: fixed;
  bottom: 64px;
  width: 100%;
  background: white;
`;

const RequestDetailsListItem = styled(List.Item)`
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
