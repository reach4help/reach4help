import {
  CloseOutlined,
  LogoutOutlined,
  MailOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from 'src/theme/colors';
import { MenuItem } from 'src/types/menu-item';
import styled from 'styled-components';

import SideNavMenu from '../SideNavMenu/SideNavMenu';

const { Text } = Typography;

const SideDrawer: React.FC<SideDrawerProps> = ({
  collapsed,
  closeSider,
  menuItems,
  profileData,
  siteLocations,
}) => (
  <Layout.Sider collapsed={collapsed} theme="light">
    <CloseButton onClick={closeSider}>
      <CloseOutlined />
    </CloseButton>
    <ProfileWrapper>
      <ProfileImg src={profileData.photoUrl} />
      <ProfileContent>
        <ProfileUserName>{profileData.fullName}</ProfileUserName>
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
    <SideNavMenu items={menuItems || []} closeSider={closeSider} />
    <BottomLinks>
      <Link to={{ pathname: siteLocations.contact.path }} onClick={closeSider}>
        <MailOutlined />
        Contact us
      </Link>
      <Link to={{ pathname: siteLocations.logout.path }} onClick={closeSider}>
        <LogoutOutlined />
        Sign out
      </Link>
    </BottomLinks>
  </Layout.Sider>
);

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px;
  background: inherit;
  border: none;
  outline: none;
`;

const ProfileWrapper = styled.div`
  display: flex;
  background: ${COLORS.backgroundLightGray};
  padding: 30px 15px;
`;

const ProfileImg = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 56px;
  background-color: darkgray;
`;

const ProfileContent = styled.div`
  margin-left: 14px;
`;

const ProfileUserName = styled(Text)`
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

const BottomLinks = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  margin: 15px;
  color: inherit;

  a {
    color: inherit;
    margin-bottom: 10px;
    padding: 0 10px;

    svg {
      margin-right: 10px;
    }
  }
`;

interface SideDrawerProps {
  collapsed: boolean;
  closeSider: () => void;
  menuItems: Array<MenuItem>;
  profileData: {
    fullName: string;
    photoUrl: string;
    followers: number;
    stars: number;
  };
  siteLocations: any;
}

export default SideDrawer;
