import { TeamOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import { User } from 'src/models/users/User';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const { Text } = Typography;

const CasesCompletedIcon = <TeamOutlined />;

const SideDrawerProfile: React.FC<SideDrawerProfileProps> = ({
  profileData,
}) => (
  <SideDrawerProfileWrapper>
    <DisplayPhoto
      src={profileData?.displayPicture || undefined}
      style={{ objectFit: 'cover' }}
    />
    <Content>
      <DisplayName>{profileData?.displayNickname}</DisplayName>
      <Details>
        <Detail>
          {CasesCompletedIcon}
          {profileData?.casesCompleted}
        </Detail>
        <Detail />
      </Details>
    </Content>
  </SideDrawerProfileWrapper>
);

const SideDrawerProfileWrapper = styled.div`
  display: flex;
  background: ${COLORS.backgroundLightGray};
  padding: 30px 15px;
`;

const Content = styled.div`
  margin-left: 14px;
`;

const DisplayName = styled(Text)`
  font-size: 1.2rem;
`;

const DisplayPhoto = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 56px;
  background-color: darkgray;
`;

const Details = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Detail = styled('span')`
  color: inherit;
  font-size: 0.8rem;
  margin-right: 10px;

  svg {
    color: ${COLORS.primary};
  }
`;
interface SideDrawerProfileProps {
  profileData?: User;
}

export default SideDrawerProfile;
