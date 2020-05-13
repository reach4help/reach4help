import React from 'react';
import { OfferStatus } from 'src/models/offers';
import { RequestStatus } from 'src/models/requests';
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
    type: 'CREATE_REQUEST',
    user: mockPin,
    offer: null,
    request: mockRequest,
    createdAt: new Date(today).setDate(today.getDate() - 9),
  },
  {
    type: 'CANCEL_REQUEST',
    user: mockPin,
    offer: null,
    request: mockRequest,
    createdAt: new Date(today).setDate(today.getDate() - 8),
  },
  {
    type: 'COMPLETE_REQUEST',
    user: mockCav,
    offer: null,
    request: mockRequest,
    createdAt: new Date(today).setDate(today.getDate() - 7),
  },
  {
    type: 'REMOVE_REQUEST',
    user: mockCav,
    offer: null,
    request: mockRequest,
    createdAt: new Date(today).setDate(today.getDate() - 6),
  },
  {
    type: 'CREATE_OFFER',
    user: mockCav,
    request: mockRequest,
    offer: mockOffer,
    createdAt: new Date(today).setDate(today.getDate() - 5),
  },
  {
    type: 'ACCEPT_OFFER',
    user: mockPin,
    request: { ...mockRequest, status: RequestStatus.ongoing },
    offer: { ...mockOffer, status: OfferStatus.accepted },
    createdAt: new Date(today).setDate(today.getDate() - 4),
  },
  {
    type: 'REJECT_OFFER',
    user: mockPin,
    request: { ...mockRequest, status: RequestStatus.ongoing },
    offer: { ...mockOffer, status: OfferStatus.accepted },
    createdAt: new Date(today).setDate(today.getDate() - 3),
  },
  {
    type: 'RATE_PIN',
    user: mockCav,
    request: { ...mockRequest, status: RequestStatus.ongoing },
    offer: { ...mockOffer, status: OfferStatus.accepted },
    createdAt: new Date(today).setDate(today.getDate() - 2),
  },
  {
    type: 'RATE_CAV',
    user: mockPin,
    request: { ...mockRequest, status: RequestStatus.ongoing },
    offer: { ...mockOffer, status: OfferStatus.accepted },
    createdAt: new Date(today).setDate(today.getDate() - 1),
  },
];

const RequestTimeline: React.FC<RequestTimelineProps> = () => (
  <Wrapper>
    <Title>Request Timeline</Title>
    {/* <RequestTimelineList items={mockTimelineItems} currentUser={mockPin} /> */}
    <RequestTimelineList items={mockTimelineItems} currentUser={mockCav} />
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
