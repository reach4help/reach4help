import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { triggerLoginWithPhone, verifyOTPPhone } from 'src/ducks/auth/actions';
import firebase from 'src/firebase';
import { AppState } from 'src/store';

import Entry from '../../components/PhoneNumber/Entry';
import Verify from '../../components/PhoneNumber/Verify';
import Wrapper from '../../components/PhoneNumber/wrapper';

interface Props {
  type: string;
}

const PhoneNumberVerifierContainer: React.FC<Props> = ({ type }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth.user);
  const loading = useSelector((state: AppState) => state.auth.loading);
  const error: Error = useSelector((state: AppState) => state.auth.error);

  // eslint-disable-next-line @typescript-eslint/camelcase
  const handleEntrySubmit = (
    values: { phoneNumber: string },
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

  if (type === 'entry') {
    return (
      <>
        <Wrapper
          loading={loading}
          errorMessage={error && error.message ? error.message : null}
        >
          <Entry loading={loading} handleFormSubmit={handleEntrySubmit} />
        </Wrapper>
      </>
    );
  }
  return (
    <>
      <Wrapper
        loading={loading}
        errorMessage={error && error.message ? error.message : null}
      >
        <Verify loading={loading} handleFormSubmit={handleVerifySubmit} />
      </Wrapper>
    </>
  );
};

PhoneNumberVerifierContainer.propTypes = {};

export default PhoneNumberVerifierContainer;
