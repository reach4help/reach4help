import React from 'react';
import { OfferStatus } from 'src/models/offers';
import { RequestStatus } from 'src/models/requests';
import { TimelineItemAction } from 'src/models/requests/timeline';
import { ApplicationPreference } from 'src/models/users';
import styled from 'styled-components';

import RequestTimelineList from '../RequestTimelineList/RequestTimelineList';

const today = new Date();

const mockPin = {
  username: 'PinUser',
  applicationPreference: ApplicationPreference.pin,
};

const mockCav = {
  username: 'CavUser',
  applicationPreference: ApplicationPreference.cav,
};

const mockRequest = {
  pin: mockPin,
  cav: null,
  status: RequestStatus.pending,
};

const mockOffer = {
  pin: mockPin,
  request: mockRequest,
  status: OfferStatus.pending,
};

const mockTimelineItems = [
  {
    action: TimelineItemAction.CREATE_REQUEST,
    actor: mockPin,
    offer: null,
    request: mockRequest,
    createdAt: new Date(today).setDate(today.getDate() - 9),
  },
  {
    action: TimelineItemAction.CANCEL_REQUEST,
    actor: mockPin,
    offer: null,
    request: mockRequest,
    createdAt: new Date(today).setDate(today.getDate() - 8),
  },
  {
    action: TimelineItemAction.COMPLETE_REQUEST,
    actor: mockCav,
    offer: null,
    request: mockRequest,
    createdAt: new Date(today).setDate(today.getDate() - 7),
  },
  {
    action: TimelineItemAction.REMOVE_REQUEST,
    actor: mockCav,
    offer: null,
    request: mockRequest,
    createdAt: new Date(today).setDate(today.getDate() - 6),
  },
  {
    action: TimelineItemAction.CREATE_OFFER,
    actor: mockCav,
    request: mockRequest,
    offer: mockOffer,
    createdAt: new Date(today).setDate(today.getDate() - 5),
  },
  {
    action: TimelineItemAction.ACCEPT_OFFER,
    actor: mockPin,
    request: { ...mockRequest, status: RequestStatus.ongoing },
    offer: { ...mockOffer, status: OfferStatus.accepted },
    createdAt: new Date(today).setDate(today.getDate() - 4),
  },
  {
    action: TimelineItemAction.REJECT_OFFER,
    actor: mockPin,
    request: { ...mockRequest, status: RequestStatus.ongoing },
    offer: { ...mockOffer, status: OfferStatus.accepted },
    createdAt: new Date(today).setDate(today.getDate() - 3),
  },
  {
    action: TimelineItemAction.RATE_PIN,
    actor: mockCav,
    request: { ...mockRequest, status: RequestStatus.ongoing },
    offer: { ...mockOffer, status: OfferStatus.accepted },
    createdAt: new Date(today).setDate(today.getDate() - 2),
  },
  {
    action: TimelineItemAction.RATE_CAV,
    actor: mockPin,
    request: { ...mockRequest, status: RequestStatus.ongoing },
    offer: { ...mockOffer, status: OfferStatus.accepted },
    createdAt: new Date(today).setDate(today.getDate() - 1),
  },
];

const RequestTimeline: React.FC<RequestTimelineProps> = () => (
  <Wrapper>
    <Title>Request Timeline</Title>
    <RequestTimelineList items={mockTimelineItems} currentUser={mockPin} />
    {/* <RequestTimelineList items={mockTimelineItems} currentUser={mockCav} /> */}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  padding-top: 20px;
  height: 100%;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.2rem;
`;

interface RequestTimelineProps {
  some?: string;
}

export default RequestTimeline;
