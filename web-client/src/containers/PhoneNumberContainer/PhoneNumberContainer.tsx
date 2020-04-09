import { Alert } from 'antd';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import IntroLogo from 'src/components/IntroLogo/IntroLogo';
import IntroWrapper from 'src/components/IntroWrapper/IntroWrapper';
import { triggerLoginWithPhone, verifyOTPPhone } from 'src/ducks/auth/actions';
import firebase from 'src/firebase';
import { AppState } from 'src/store';

import logo from '../../assets/logo.png';
import PhoneNumberEntryForm from '../../components/PhoneNumberEntryForm/PhoneNumberEntryForm';
import PhoneNumberVerifyForm from '../../components/PhoneNumberVerifyForm/PhoneNumberVerifyForm';
import TitleWithAddon from '../../components/TitleWithAddon/TitleWithAddon';
import { PhoneNumberSteps } from './constants';

interface Props {
  type: PhoneNumberSteps;
}

const PhoneNumberVerifierContainer: React.FC<Props> = ({ type }) => {
  const dispatch = useDispatch();
  const user: firebase.User = useSelector((state: AppState) => state.auth.user);
  const loading = useSelector((state: AppState) => state.auth.loading);
  const error: Error = useSelector((state: AppState) => state.auth.error);
  const { t } = useTranslation();

  const handleEntrySubmit = (
    values: { phoneNumber: string },
    // eslint-disable-next-line @typescript-eslint/camelcase
    recaptchaVerifier: firebase.auth.RecaptchaVerifier_Instance,
  ) => {
    dispatch(
      triggerLoginWithPhone({
        currentUser: user,
        recaptchaVerifier,
        phoneNumber: values.phoneNumber,
      }),
    );
  };

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
    () => (user.photoURL ? `${user.photoURL}?height=300` : logo),
    [user],
  );
  return (
    <IntroWrapper>
      {errorMessage && errorMessage !== '' ? (
        <Alert message={errorMessage} type="error" />
      ) : null}
      <IntroLogo src={profilePhoto} alt="User logo" />
      <TitleWithAddon level={4}>{`${t('welcome')}, ${
        user.displayName
      }`}</TitleWithAddon>
      {type === PhoneNumberSteps.ENTRY ? (
        <PhoneNumberEntryForm
          loading={loading}
          handleFormSubmit={handleEntrySubmit}
        />
      ) : (
        <PhoneNumberVerifyForm
          loading={loading}
          handleFormSubmit={handleVerifySubmit}
        />
      )}
    </IntroWrapper>
  );
};

PhoneNumberVerifierContainer.propTypes = {};

export default PhoneNumberVerifierContainer;
