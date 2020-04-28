import { StarOutlined, TeamOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const { Text } = Typography;

interface SideDrawerProfileProps {
  profileData: any;
}

const SideDrawerProfile: React.FC<SideDrawerProfileProps> = ({
  profileData,
}) => (
  <ProfileWrapper>
    <DisplayPhoto src={profileData.photoUrl} />
    <ProfileContent>
      <DisplayName>{profileData.fullName}</DisplayName>
      <ProfileDetails>
        <ProfileDetail>
          <TeamOutlined />
          {profileData.followers}
        </ProfileDetail>
        <ProfileDetail>
          <StarOutlined />
          {profileData.stars}
        </ProfileDetail>
      </ProfileDetails>
    </ProfileContent>
  </ProfileWrapper>
);

const ProfileWrapper = styled.div`
  display: flex;
  background: ${COLORS.backgroundLightGray};
  padding: 30px 15px;
`;

const DisplayPhoto = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 56px;
  background-color: darkgray;
`;

const ProfileContent = styled.div`
  margin-left: 14px;
`;

const DisplayName = styled(Text)`
  font-size: 1.2rem;
`;

const ProfileDetails = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ProfileDetail = styled.span`
  color: inherit;
  font-size: 0.8rem;
  margin-right: 10px;

  svg {
    color: ${COLORS.primary};
  }
`;

export default SideDrawerProfile;
