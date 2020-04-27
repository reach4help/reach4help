import { CloseOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from 'src/theme/colors';
import { MenuItem } from 'src/types/menu-item';
import styled from 'styled-components';

import SideNavMenu from '../SideNavMenu/SideNavMenu';

const CloseButton = styled.button`
  float: right;
  right: 0;
  padding: 15px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  margin: 30px 15px;
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

const ProfileUserName = styled.text`
  font-size: 1.2rem;
`;

const ProfileLinks = styled.div`
  display: flex;
  justify-content: flex-start;

  > a {
    color: inherit;
    font-size: 0.8rem;
    margin-right: 10px;

    svg {
      color: ${COLORS.primary};
    }
  }
`;

const SideDrawer: React.FC<SideDrawerProps> = ({
  menuLinks,
  closeHandler,
  collapsed,
}) => (
  <Layout.Sider collapsed={collapsed} theme="light">
    <CloseButton onClick={closeHandler}>
      <CloseOutlined />
    </CloseButton>
    <ProfileWrapper>
      <ProfileImg />
      <ProfileContent>
        <ProfileUserName>Burhan Tuerker</ProfileUserName>
        <ProfileLinks>
          <Link to="hello">
            <TeamOutlined /> 15
          </Link>
          <Link to="hello">
            <StarOutlined /> 4.7
          </Link>
        </ProfileLinks>
      </ProfileContent>
    </ProfileWrapper>
    <SideNavMenu items={menuLinks || []} />
  </Layout.Sider>
);

interface SideDrawerProps {
  collapsed: boolean;
  menuLinks: Array<MenuItem>;
  closeHandler: () => void;
}

export default SideDrawer;
