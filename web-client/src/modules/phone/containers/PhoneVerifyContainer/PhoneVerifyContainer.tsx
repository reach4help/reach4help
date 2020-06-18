import { Alert } from 'antd';
import get from 'lodash/get';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import logo from 'src/assets/logo.png';
import IntroLogo from 'src/components/IntroLogo/IntroLogo';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import { verifyOTPPhone } from 'src/ducks/auth/phone/actions';
import { AppState } from 'src/store';

import IntroWrapper from '../../../../components/IntroComponent/IntroComponent';
import PhoneNumberVerifyForm from '../../components/PhoneNumberVerifyForm/PhoneNumberVerifyForm';
import { PhoneEntryLocation } from '../../pages/routes/PhoneEntryRoute/constants';

const PhoneVerifyContainer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth.user);
  const loading = useSelector((state: AppState) => state.auth.loading);
  const confirmationResult = useSelector(
    (state: AppState) => state.auth.confirmationResult,
  );
  const location = useLocation();
  const error = useSelector((state: AppState) => state.auth.error);
  const redirectBack = get(location, 'state.redirectBack');
  const { t } = useTranslation();

  const handleVerifySubmit = ({ otp }: { otp: string }) => {
    dispatch(
      verifyOTPPhone({
        otp,
      }),
    );
  };

  const errorMessage = useMemo(
    () => (error && error.message ? error.message : null),
    [error],
  );
  const profilePhoto = useMemo(
    () => (user?.photoURL ? `${user.photoURL}?height=300` : logo),
    [user],
  );

  if (!confirmationResult) {
    return (
      <Redirect
        to={{
          pathname: PhoneEntryLocation.path,
          state: { redirectBack: redirectBack || location.pathname },
        }}
      />
    );
  }
  return (
    <IntroWrapper>
      {errorMessage && <Alert message={errorMessage} type="error" />}
      <IntroLogo src={profilePhoto} alt="User logo" />
      <TitleWithAddon level={4}>
        {`${t('welcome')}, ${user?.displayName}`}
      </TitleWithAddon>
      <PhoneNumberVerifyForm
        loading={loading}
        handleFormSubmit={handleVerifySubmit}
      />
    </IntroWrapper>
  );
};

export default PhoneVerifyContainer;
