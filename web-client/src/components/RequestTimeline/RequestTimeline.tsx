import React from 'react';
import { OfferStatus } from 'src/models/offers';
import { RequestStatus } from 'src/models/requests';
import { ApplicationPreference } from 'src/models/users';
import styled from 'styled-components';

import RequestTimelineList from '../RequestTimelineList/RequestTimelineList';

const today = new Date('12/31/2015');

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
    type: 'REQUEST_CREATED',
    user: mockPin,
    offer: null,
    request: mockRequest,
    createdAt: new Date(today).setDate(today.getDate() - 5),
  },
  {
    type: 'OFFER_CREATED',
    user: mockCav,
    request: mockRequest,
    offer: mockOffer,
    createdAt: new Date(today).setDate(today.getDate() - 4),
  },
  {
    type: 'OFFER_ACCEPTED',
    user: mockPin,
    request: { ...mockRequest, status: RequestStatus.ongoing },
    offer: { ...mockOffer, status: OfferStatus.accepted },
    createdAt: new Date(today).setDate(today.getDate() - 3),
  },
];

const RequestTimeline: React.FC<RequestTimelineProps> = () => (
  <Wrapper>
    <Title>Request Timeline</Title>
    <RequestTimelineList items={mockTimelineItems} currentUser={mockPin} />
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
  font-size: 1.2rem;
`;

interface RequestTimelineProps {
  some?: string;
}

export default RequestTimeline;
