import {
  BellFilled as NotificationsIcon,
  MenuOutlined as SideMenuIcon,
} from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import Logo from 'src/assets/logo.svg';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const { Text } = Typography;

const TopNavbar: React.FC<TopNavbarProps> = ({
  openMenu,
  openNotifications,
  isCav,
  unseenOffersCount,
  visible = true,
}) =>
  visible ? (
    <TopNavbarWrapper>
      <NavButton isCav={isCav} onClick={openMenu}>
        <SideMenuIcon />
      </NavButton>
      <NavButton>
        <IconImg src={Logo} />
        <IconText>
          Reach<TextOrange>4</TextOrange>Help
        </IconText>
      </NavButton>
      <NavButton isCav={isCav} onClick={openNotifications}>
        {unseenOffersCount > 0 ? (
          <NotificationsIcon style={{ color: 'red' }} />
        ) : (
          <NotificationsIcon />
        )}
      </NavButton>
    </TopNavbarWrapper>
  ) : null;

const NavButton = styled('button')<{ isCav?: boolean }>`
  font-size: 1.3rem;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  padding: 0 1rem;
  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    color: ${props =>
      props.isCav ? COLORS.link : COLORS.brandOrange} !important;
    font-weight: 700;
  }
`;

const TopNavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  background: radial-gradient(
    50% 1712.04% at 50.13% 50%,
    #811e78 22.4%,
    #a12596 100%
  );
  z-index: 999;
`;

const IconImg = styled.img`
  width: 32px;
  height: 32px;
`;

const IconText = styled(Text)`
  font-size: 1.2rem;
  color: white;
  padding: 5px;
`;

const TextOrange = styled(Text)`
  color: #ff7b02;
`;

interface TopNavbarProps {
  openMenu: () => void;
  openNotifications: () => void;
  isCav?: boolean;
  visible?: boolean;
  unseenOffersCount: number;
}

export default TopNavbar;
