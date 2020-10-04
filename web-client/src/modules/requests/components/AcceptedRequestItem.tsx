import React from 'react';
import { useTranslation } from 'react-i18next';
import { Offer } from 'src/models/offers';
import { Request } from 'src/models/requests';
import styled, { keyframes } from 'styled-components';

import { COLORS } from '../../../theme/colors';
import defaultUserPic from '../assets/role_pin.png';

const RequestItem: React.FC<RequestItemProps> = ({
  request,
  handleRequest,
  offers,
}): React.ReactElement => {
  const { t } = useTranslation();
  const handleRequestClick = () => {
    handleRequest();
  };

  const displayOfferPics = () => {
    const visualizedOffers: React.ReactElement<any>[] = [];
    for (const offerKey in offers) {
      if (offers[offerKey]) {
        visualizedOffers.push(
          <UserPic
            key={offerKey}
            src={
              offers[offerKey].cavUserSnapshot.displayPicture || defaultUserPic
            }
            alt={offers[offerKey].cavUserSnapshot.displayName || 'User offer'}
          />,
        );
      }
    }
    return visualizedOffers;
  };
  return (
    <Item onClick={handleRequestClick}>
      <RequestItemText>
        <Title style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{request.title}</Title>
        <InnerText style={{ marginBottom: '20px' }}>
          {request.description}
        </InnerText>
        <InnerText
          style={{
            color: 'rgba(0, 0, 0, 0.45)',
            fontSize: '12px',
            marginBottom: '10px',
          }}
        >
          {t('modules.requests.AcceptedRequestItem.choose_volunteer')}
        </InnerText>
        <div style={{ display: 'flex' }}>
          {displayOfferPics()}
          {Object.keys(offers).length > 4 && (
            <div
              style={{
                width: '56px',
                height: '56px',
                margin: '5px',
                borderRadius: '105px',
                animation: 'fadeIn 0.75s',
                backgroundColor: '#C4C4C4',
                color: '#000000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >{`+${Object.keys(offers).length - 4}`}</div>
          )}
        </div>
      </RequestItemText>
    </Item>
  );
};

const Item = styled.div`
  overflow: auto;
  margin: 15px;
  padding: 12px;
  background: #ffffff;
  border: 1px solid ${COLORS.strokeCards};
  border-radius: 2px;
`;

const RequestItemText = styled.div`
  float: left;
  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.65);
  padding: 5px;
`;

const Title = styled.h4`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 5px;
`;

const InnerText = styled.p`
  margin-bottom: 3px;
  font-family: Roboto, sans-serif;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const UserPic = styled.img`
  float: left;
  width: 56px;
  height: 56px;
  margin: 5px;
  border-radius: 105px;
  animation: ${fadeIn} 0.75s;
  object-fit: cover;
`;

export interface RequestItemProps {
  request: Request;
  handleRequest: (action?: boolean) => void;
  offers: Record<string, Offer>;
}

export default RequestItem;
