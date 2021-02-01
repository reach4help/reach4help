import { Alert, Typography } from 'antd';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import { triggerLoginWithPhone } from 'src/ducks/auth/phone/actions';
import firebase from 'src/firebase';
import { AppState } from 'src/store';
import styled from 'styled-components';

import IntroWrapper from '../../../../components/IntroComponent/IntroComponent';
import PhoneNumberEntryForm from '../../components/PhoneNumberEntryForm/PhoneNumberEntryForm';

const { Text } = Typography;

const PhoneEntryContainer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth.user);
  const loading = useSelector((state: AppState) => state.auth.loading);
  const error = useSelector((state: AppState) => state.auth.error);
  const { t } = useTranslation();

  const handleEntrySubmit = (
    values: { phoneNumber: string },
    // eslint-disable-next-line @typescript-eslint/camelcase
    recaptchaVerifier: firebase.auth.RecaptchaVerifier_Instance,
  ) => {
    if (user) {
      dispatch(
        triggerLoginWithPhone({
          currentUser: user,
          recaptchaVerifier,
          phoneNumber: values.phoneNumber,
        }),
      );
    }
  };

  const errorMessage = useMemo(() => {
    if (error?.message === 'TOO_LONG' || error?.message === 'TOO_SHORT') {
      return 'Please enter a valid phone number capable of receiving SMS with the country code prefixing it.';
    }
    if (error?.message) {
      return error.message;
    }
    return null;
  }, [error]);
  return (
    <PhoneEntryWrapper>
      <ErrorMessage>
        {errorMessage && <Alert message={errorMessage} type="error" />}
      </ErrorMessage>
      <TitleWithUnderline level={3}>
        {t('phoneNumber.title')}
      </TitleWithUnderline>
      <PhoneNumberEntryForm
        loading={loading}
        reset={error instanceof Error}
        handleFormSubmit={handleEntrySubmit}
      />
    </PhoneEntryWrapper>
  );
};

const PhoneEntryWrapper = styled(IntroWrapper)`
  padding: 0;
`;

const ErrorMessage = styled(Text)`
  margin-bottom: 1rem;
`;

export default PhoneEntryContainer;
