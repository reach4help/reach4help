import {
  BellOutlined,
  EnvironmentOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BottomNavbar: React.FC<BottomNavProps> = ({
  openMenu,
  siteLocations,
}) => (
  <BottomNavWrapper>
    <NavButton onClick={openMenu}>
      <MenuOutlined />
    </NavButton>
    <Link to={{ pathname: siteLocations.map.path }}>
      <NavButton>
        <EnvironmentOutlined style={{ fontSize: '2rem' }} />
      </NavButton>
    </Link>
    <Link to={{ pathname: siteLocations.notifications.path }}>
      <NavButton>
        <BellOutlined />
      </NavButton>
    </Link>
  </BottomNavWrapper>
);

const NavButton = styled.div`
  font-size: 1.2rem;
  padding: 15px 30px;
`;

const BottomNavWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 64px;
  background-color: #dadada;
  z-index: 999;

  a {
    color: inherit;
  }
`;

interface BottomNavProps {
  openMenu: () => void;
  siteLocations: any;
}

export default BottomNavbar;
