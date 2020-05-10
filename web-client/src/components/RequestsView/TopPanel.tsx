import { StarOutlined, DownOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import DummyMan from 'src/assets/dummy-man.jpg';
import NavBackIcon from 'src/assets/nav-back-icon.svg';
import PhoneIcon from 'src/assets/phone-icon.svg';
import LocationIcon from 'src/assets/location-icon.svg';
import React from 'react';
import styled from 'styled-components';
import { COLORS } from 'src/theme/colors';

const { Text } = Typography;

const TopPanel: React.FC = () => (
  <TopPanelWrapper>
    <NavRow>
      <img src={NavBackIcon} alt="back navigation icon" />
      <StatusButton type="button">Finished</StatusButton>
    </NavRow>
    <UserRow>
      <DisplayPhoto src={DummyMan} alt="display photo" />
      <UserDetails>
        <Detail>
          <DisplayName>Daniel Wade</DisplayName>
          <Info>
            <InfoDetail>
              <AverageRatingIcon />
              <span>5</span>
            </InfoDetail>
            <InfoDetail>
              <img src={LocationIcon} alt="location icon" />
              <span>2 km</span>
            </InfoDetail>
          </Info>
        </Detail>
        <img src={PhoneIcon} alt="phone icon" />
      </UserDetails>
    </UserRow>
    <RequestWrapper>
      <span>Pet walking</span>
      <DownOutlined />
    </RequestWrapper>
  </TopPanelWrapper>
);

const TopPanelWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(142.67deg, #f27979 2.64%, #7d00a3 97.36%);
  border-radius: 0px 0px 4px 4px;
  padding: 1rem;
  color: white;
`;

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const StatusButton = styled.button`
  background: rgba(${COLORS.successRGB}, 0.25);
  border: 1px solid ${COLORS.success};
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
  margin-bottom: 0.5rem;
`;

const DisplayPhoto = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: darkgray;
  margin-right: 20px;
`;

const UserDetails = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Detail = styled.div`
  width: 35%;
  max-width: 8rem;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  span:first-child {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

export default TopPanel;
