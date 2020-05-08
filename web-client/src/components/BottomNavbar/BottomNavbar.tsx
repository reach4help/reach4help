import {
  BellOutlined,
  EnvironmentOutlined,
  MenuOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

const BottomNavbar: React.FC<BottomNavProps> = ({
  openMenu,
  openNewRequestModal,
  openNotifications,
  isCav,
}) => (
  <Wrapper>
    <NavButton onClick={openMenu}>
      <SideMenuIcon />
    </NavButton>
    {isCav === false && (
      <NavButton onClick={openNewRequestModal}>
        <NewRequestIcon />
      </NavButton>
    )}
    {isCav === true && (
      <NavButton onClick={() => alert('the map module is still being made!')}>
        <MapsIcon />
      </NavButton>
    )}
    <NavButton onClick={openNotifications}>
      <NotificationsIcon />
    </NavButton>
  </Wrapper>
);

const NewRequestIcon = styled(PlusCircleOutlined)`
  font-size: 2rem;
`;

const MapsIcon = styled(EnvironmentOutlined)`
  font-size: 2rem;
`;

const NotificationsIcon = styled(BellOutlined)``;

const SideMenuIcon = styled(MenuOutlined)``;

const NavButton = styled.button`
  width: 64px;
  height: 64px;
  font-size: 1.2rem;
  background: inherit;
  border: none;
  outline: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 64px;
  background-color: #dadada;
  z-index: 999;
`;

interface BottomNavProps {
  openMenu: () => void;
  openNewRequestModal: () => void;
  openNotifications: () => void;
  isCav?: boolean;
}

export default BottomNavbar;
