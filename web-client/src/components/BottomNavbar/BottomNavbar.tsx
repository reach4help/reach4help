import { BellFilled as NotificationsIcon } from '@ant-design/icons';
import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { FindRequestsLocation } from 'src/modules/requests/pages/routes/FindRequestsRoute/constants';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReactComponent as CreateNewIcon } from 'src/assets/navbar/create_new.svg';
import { ReactComponent as HomeIcon } from 'src/assets/navbar/home.svg';
import { ReactComponent as OffersIcon } from 'src/assets/navbar/offers.svg';
import { ReactComponent as ProfileIcon } from 'src/assets/navbar/profile.svg';
import { ReactComponent as RequestsIcon } from 'src/assets/navbar/requests.svg';
import { DEVICE_MAX } from 'src/constants/mediaQueries';
import { AppState } from 'src/store';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

// import { NewRequestsLocation } from '../../modules/requests/pages/routes/NewRequestsRoute/constants';

interface BottomNavbarProps {
  openMenu: () => void;
  openNotifications: () => void;
  isCav?: boolean;
  visible?: boolean;
  unseenOffersCount: number;
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({
  openMenu,
  openNotifications,
  visible = true,
  unseenOffersCount,
}) => {
  const isLoggedIn = useSelector((state: AppState) => !!state.auth.user?.email);
  const { t } = useTranslation();

  if (visible) {
    // const history = useHistory();

    return (
      <BottomNavbarWrapper>
        <NavButton onClick={openMenu}>
          <HomeIcon />
          {t('navbar.home')}
        </NavButton>

        <NavButton
        // onClick={() => history.push(FindRequestsLocation.path)}
        >
          <RequestsIcon />
          {t('navbar.my_requests')}
        </NavButton>

        <NavButton>
          <CoolNavButton
          // onClick={() => history.push(NewRequestsLocation.path)}
          >
            <CreateNewIcon />
          </CoolNavButton>
        </NavButton>

        <NavButton
        // onClick={() => history.push(NewRequestsLocation.path)}
        >
          <OffersIcon />
          {t('navbar.my_offers')}
        </NavButton>

        {isLoggedIn ? (
          <NavButton onClick={openNotifications}>
            {unseenOffersCount > 0 ? (
              <NotificationsIcon style={{ color: 'red' }} />
            ) : (
              <NotificationsIcon />
            )}
          </NavButton>
        ) : (
          <NavButton
          // onClick={() => history.push(NewRequestsLocation.path)}
          >
            <ProfileIcon />
            {t('navbar.login')}
          </NavButton>
        )}
      </BottomNavbarWrapper>
    );
  }

  return <></>;
};

const BottomNavbarWrapper = styled.nav`
  display: none;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 64px;
  background: white;
  color: ${COLORS.link};
  z-index: 999;

  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);

  @media ${DEVICE_MAX.tablet} {
    display: flex;
  }
`;

const NavButton = styled('button')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  height: 100%;
  font-size: 1rem;
  font-weight: 500;
  background: inherit;
  border: none;
  outline: none;

  &:hover,
  &:focus,
  &:active,
  &:focus-within {
    color: ${COLORS.brandOrange};
    font-weight: 700;

    path {
      /* fill: ${COLORS.brandOrange}; */
      stroke: ${COLORS.brandOrange};
    }
  }
`;

const CoolNavButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background: linear-gradient(135deg, #f27979 2.64%, #7d00a3 97.36%);
  box-shadow: 0px 4px 4px rgba(129, 30, 121, 0.25);
  border-radius: 50%;
  height: 64px;
  width: 64px;
`;

export default BottomNavbar;
