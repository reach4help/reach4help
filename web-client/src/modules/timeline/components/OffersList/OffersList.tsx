import {
  HeartOutlined,
  StarOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Offer } from 'src/models/offers';
import styled, { keyframes } from 'styled-components';

interface OffersListProps {
  // offers: Record<string, Offer>;
  offers: any;
  loading: boolean;
  handleOffer: (action: boolean) => void;
}

interface OfferItemProps {
  // offer: Offer;
  offer: any;
  handleOffer: (action: boolean) => void;
}

const Item = styled.div`
  overflow: auto;
  margin: 15px;
  padding: 20px 16px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 20px;
  font-size: 1.2rem;
  text-align: center;
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
  margin-right: 10px;
  border-radius: 105px;
  animation: ${fadeIn} 0.75s;
  object-fit: cover;
`;

const UserName = styled.text`
  font-size: 20px;
  font-weight: bold;
`;

const TextVolunteer = styled.text`
  display: block;
  font-weight: 900;
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.45);
`;

const IconsBlock = styled.div`
  display: block;
`;

const IconContainer = styled.div`
  color: #811e78;
  display: inline-block;
  margin-left: 12px;
`;

const IconContainerFirst = styled(IconContainer)`
  margin-left: 0;
`;

const TextIcon = styled.text`
  display: inline-block;
  font-size: 14px;
  margin-left: 10px;
`;

const StyledButton = styled(Button)`
  height: 36px;
  border-radius: 4px;
  max-width: 150px;
  width: 47%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const AcceptButton = styled(StyledButton)`
  background-color: #52c41a;
  color: #fff;
  margin-left: 14px;
`;

const ButtonsContainer = styled.div`
  margin-top: 12px;
`;

const OfferItem: React.FC<OfferItemProps> = ({
  offer,
  handleOffer,
}): React.ReactElement => (
  <>
    {/* {offer.cavUserSnapshot.displayName} */}
    <Item>
      <UserPic src={offer.displayPicture} alt="Display Picture" />
      <UserName>{offer.displayName}</UserName>

      <TextVolunteer>Volunteer</TextVolunteer>
      <IconsBlock>
        <IconContainerFirst>
          <HeartOutlined />
        </IconContainerFirst>
        <TextIcon>{offer.likes}</TextIcon>
        <IconContainer>
          <StarOutlined />
        </IconContainer>
        <TextIcon>{offer.averageRating}</TextIcon>
        <IconContainer>
          <HeartOutlined />
        </IconContainer>
        <TextIcon>{offer.distance}</TextIcon>
      </IconsBlock>
      <ButtonsContainer>
        <StyledButton onClick={() => handleOffer(true)}>
          <UserSwitchOutlined />
          Reject
        </StyledButton>
        <AcceptButton onClick={() => handleOffer(false)}>
          <HeartOutlined />
          Accept
        </AcceptButton>
      </ButtonsContainer>
    </Item>
  </>
);

const OffersList: React.FC<OffersListProps> = ({
  offers,
  handleOffer,
}): React.ReactElement => {
  const [offersList, setOffersList] = useState<React.ReactElement<any>[]>([]);

  useEffect(() => {
    const internalOffersList: React.ReactElement<any>[] = [];
    for (const key in offers) {
      if (offers[key]) {
        internalOffersList.push(
          <OfferItem handleOffer={handleOffer} offer={offers[key]} />,
        );
      }
    }

    setOffersList(internalOffersList);
  }, [offers, handleOffer, setOffersList]);

  return (
    <>
      <Title>Select A Volunteer</Title>
      {offersList}
    </>
  );
};

export default OffersList;
