import {
  EnvironmentFilled as MapsIcon,
  PlusCircleFilled as NewRequestIcon,
  BellFilled as NotificationsIcon,
  MenuOutlined as SideMenuIcon,
} from '@ant-design/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { FindRequestsLocation } from 'src/modules/requests/pages/routes/FindRequestsRoute/constants';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

import { NewRequestsLocation } from '../../modules/requests/pages/routes/NewRequestsRoute/constants';

const BottomNavbar: React.FC<BottomNavbarProps> = ({
  openMenu,
  openNotifications,
  isCav,
}) => {
  const history = useHistory();
  return (
    <BottomNavbarWrapper>
      <NavButton isCav={isCav} onClick={openMenu}>
        <SideMenuIcon />
      </NavButton>
      {isCav ? (
        <NavButton
          isCav={isCav}
          onClick={() => history.push(FindRequestsLocation.path)}
        >
          <MapsIcon />
        </NavButton>
      ) : (
        <NavButton
          isCav={isCav}
          onClick={() => history.push(NewRequestsLocation.path)}
        >
          <NewRequestIcon />
        </NavButton>
      )}
      <NavButton isCav={isCav} onClick={openNotifications}>
        <NotificationsIcon />
      </NavButton>
    </BottomNavbarWrapper>
  );
};

const NavButton = styled('button')<{ isCav?: boolean }>`
  width: 33%;
  height: 64px;
  font-size: 2rem;
  background: inherit;
  border: none;
  outline: none;
  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    color: white;
    font-weight: 700;
    background-color: ${props =>
      props.isCav ? COLORS.link : COLORS.brandOrange};
  }
`;

const BottomNavbarWrapper = styled.div`
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

interface BottomNavbarProps {
  openMenu: () => void;
  openNotifications: () => void;
  isCav?: boolean;
}

export default BottomNavbar;
