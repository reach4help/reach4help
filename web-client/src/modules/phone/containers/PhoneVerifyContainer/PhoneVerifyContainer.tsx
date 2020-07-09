import { Alert } from 'antd';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import { resetResendCode, verifyOTPPhone } from 'src/ducks/auth/phone/actions';
import { AppState } from 'src/store';

import IntroWrapper from '../../../../components/IntroComponent/IntroComponent';
import PhoneNumberVerifyForm from '../../components/PhoneNumberVerifyForm/PhoneNumberVerifyForm';

const PhoneVerifyContainer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth.user);
  const loading = useSelector((state: AppState) => state.auth.loading);
  const error = useSelector((state: AppState) => state.auth.error);
  const { t } = useTranslation();

  const handleVerifySubmit = ({ otp }: { otp: string }) => {
    dispatch(
      verifyOTPPhone({
        otp,
      }),
    );
  };

  const resendCode = e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    dispatch(resetResendCode());
  };

  const errorMessage = useMemo(
    () => (error && error.message ? error.message : null),
    [error],
  );

  return (
    <IntroWrapper>
      {errorMessage && <Alert message={errorMessage} type="error" />}
      <TitleWithAddon level={3}>
        {`${t('welcome')}${
          user && user.displayName ? `, ${user.displayName}` : ''
        }`}
      </TitleWithAddon>
      <PhoneNumberVerifyForm
        loading={loading}
        resendCode={resendCode}
        handleFormSubmit={handleVerifySubmit}
      />
    </IntroWrapper>
  );
};

export default PhoneVerifyContainer;
