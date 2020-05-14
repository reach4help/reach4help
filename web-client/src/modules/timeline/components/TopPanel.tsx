import {
  DownOutlined,
  HomeOutlined,
  StarOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';
import React, { useState } from 'react';
import DummyMan from 'src/assets/dummy-man.jpg';
import LocationIcon from 'src/assets/location-icon.svg';
import NavBackIcon from 'src/assets/nav-back-icon.svg';
import PhoneIcon from 'src/assets/phone-icon.svg';
import { Request, RequestStatus } from 'src/models/requests';
import { COLORS } from 'src/theme/colors';
import styled, { css } from 'styled-components';

const { Text } = Typography;

interface TopPanelProps {
  request: Request;
  user: any;
}

const TopPanel: React.FC<TopPanelProps> = ({ request, user }) => {
  const [togglePanel, setTogglePanel] = useState(false);
  const userRequestStatus = request.status;

  return (
    <TopPanelWrapper>
      <NavRow>
        <img src={NavBackIcon} alt="back navigation icon" />
        <StatusButton type="button" className={userRequestStatus.toLowerCase()}>
          {userRequestStatus}
        </StatusButton>
      </NavRow>
      <UserRow>
        <DisplayPhoto src={DummyMan} alt="display photo" />
        <UserDetails>
          <Detail>
            <DisplayName>{user.name}</DisplayName>
            <Info>
              <InfoDetail>
                <AverageRatingIcon />
                <span>{user.rating}</span>
              </InfoDetail>
              <InfoDetail>
                <img src={LocationIcon} alt="location icon" />
                {/* TODO: Requires Fix from backend */}
                <span>5km</span>
              </InfoDetail>
            </Info>
          </Detail>
          {userRequestStatus ===
          (RequestStatus.ongoing || RequestStatus.completed) ? (
            <img src={PhoneIcon} alt="phone icon" />
          ) : null}
        </UserDetails>
      </UserRow>
      <RequestWrapper onClick={() => setTogglePanel(!togglePanel)}>
        <InitialRequestInfo>
          <span>{request.title}</span>
          {!togglePanel ? <DownOutlined /> : null}
        </InitialRequestInfo>

        {togglePanel ? (
          <RequestDetails>
            <RequestDetail>
              <Text> - {request.description} </Text>
            </RequestDetail>
            <Address>
              {/* TODO: needs fix from backend */}
              <AddressTextAndArrow>
                <Text>Delivery Address </Text>
                <UpOutlined />
              </AddressTextAndArrow>
              <AddressInfo>
                <HomeOutlined />
                <Text> 509 Gorby Lane, Jackson, FL 32065 </Text>
              </AddressInfo>
            </Address>
          </RequestDetails>
        ) : null}
      </RequestWrapper>
    </TopPanelWrapper>
  );
};

const TopPanelWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    142.67deg,
    ${COLORS.backgroundAlternative} 2.64%,
    ${COLORS.link} 97.36%
  );
  border-radius: 0px 0px 4px 4px;
  padding: 1rem;
  color: white;

  .ant-typography {
    color: #f0f0f0;
  }

  span,
  img {
    user-select: none;
  }
`;

const flexSpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const flexAlignColumn = css`
  display: flex;
  flex-direction: column;
`;

const NavRow = styled.div`
  ${flexSpaceBetween}
`;

const StatusButton = styled.button`
  &.accepted,
  &.finished,
  &.completed {
    background: rgba(${COLORS.rgb.success}, 0.25);
    border: 1px solid ${COLORS.success};
  }
  &.ongoing {
    background: rgba(${COLORS.rgb.primary}, 0.25);
    border: 1px solid ${COLORS.primary};
  }

  &.closed {
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.45);
  }

  &.cancel {
    background: rgba(${COLORS.rgb.warning}, 0.25);
    border: 1px solid ${COLORS.backgroundAlternative};
  }

  box-sizing: border-box;
  border-radius: 2px;
  padding: 0 1rem;
  font-weight: bold;
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0.5rem 0;
`;

const DisplayPhoto = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: darkgray;
  margin-right: 20px;
`;

const UserDetails = styled.div`
  ${flexSpaceBetween}
  width: 100%;
`;

const Detail = styled.div`
  width: 50%;
  max-width: 10rem;
`;

const Info = styled.div`
  ${flexSpaceBetween}
`;

const InfoDetail = styled.div`
  width: 50%;

  span:first-child {
    margin-left: 0;
  }

  span {
    margin-left: 0.5rem;
  }
`;

const DisplayName = styled(Text)`
  font-size: 1rem;
  color: #f0f0f0;
`;

const AverageRatingIcon = styled(StarOutlined)`
  color: #811e78;
`;

const RequestWrapper = styled.div`
  ${flexAlignColumn}
  cursor: pointer;
`;

const InitialRequestInfo = styled.div`
  ${flexSpaceBetween}
  width: 100%;

  span:first-child {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

const RequestDetails = styled.div`
  ${flexAlignColumn}
`;

const RequestDetail = styled.div`
  ${flexAlignColumn}
  margin-bottom: 0.5rem;
`;

const Address = styled.div`
  margin-top: 1rem;
  ${flexAlignColumn}
  font-size: 0.8rem;

  span:first-child {
    opacity: 0.6;
  }
`;
const AddressTextAndArrow = styled.div`
  ${flexSpaceBetween}
  align-items: flex-end;
`;

const AddressInfo = styled.div`
  margin-top: 0.25rem;

  span:first-child {
    color: ${COLORS.brandOrange};
    opacity: 1;
  }

  span {
    margin-right: 0.5rem;
  }
`;

export default TopPanel;
