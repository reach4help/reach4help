import {
  BellOutlined,
  EnvironmentOutlined,
  MenuOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { FindRequestsLocation } from 'src/modules/requests/pages/routes/FindRequestsRoute/constants';
import styled from 'styled-components';

import { NewRequestsLocation } from '../../modules/requests/pages/routes/NewRequestsRoute/constants';

const BottomNavbar: React.FC<BottomNavProps> = ({
  openMenu,
  openNotifications,
  isCav,
}) => {
  const history = useHistory();
  return (
    <Wrapper>
      <NavButton onClick={openMenu}>
        <SideMenuIcon />
      </NavButton>
      {isCav === false && (
        <NavButton onClick={() => history.push(NewRequestsLocation.path)}>
          <NewRequestIcon />
        </NavButton>
      )}
      {isCav === true && (
        <NavButton onClick={() => history.push(FindRequestsLocation.path)}>
          <MapsIcon />
        </NavButton>
      )}
      <NavButton onClick={openNotifications}>
        <NotificationsIcon />
      </NavButton>
    </Wrapper>
  );
};

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
  openNotifications: () => void;
  isCav?: boolean;
}

export default BottomNavbar;
