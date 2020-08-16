import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'src/components/figma/Modal';
import LoginContainer from 'src/modules/login/containers/LoginContainer/LoginContainer';
import PersonalDataFormContainer from 'src/modules/personalData/containers/PersonalDataFormContainer/PersonalDataFormContainer';
import PhoneEntryContainer from 'src/modules/phone/containers/PhoneEntryContainer/PhoneEntryContainer';
import PhoneVerifyContainer from 'src/modules/phone/containers/PhoneVerifyContainer/PhoneVerifyContainer';
import { AppState } from 'src/store';
import styled from 'styled-components';

const AuthenticationModal: React.FC<IAuthenticationModal> = ({ isVisible }) => {
  const [showConfirmationPage, setShowConfirmationPage] = useState<boolean>(
    false,
  );
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [showPhone, setShowPhone] = useState<boolean>(false);

  const confirmationResult = useSelector(
    (state: AppState) => state.auth.confirmationResult,
  );

  const phoneNumber = useSelector(
    (state: AppState) => state.auth.user?.phoneNumber,
  );

  const user = useSelector((state: AppState) => state.auth.user);

  useEffect(() => {
    if (confirmationResult) {
      setShowConfirmationPage(true);
    } else {
      setShowConfirmationPage(false);
    }
  }, [confirmationResult]);

  useEffect(() => {
    if (!user) {
      setShowAuth(true);
    } else {
      setShowAuth(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && !phoneNumber) {
      setShowPhone(true);
    } else {
      setShowPhone(false);
    }
  }, [user, phoneNumber]);

  return (
    <Modal visible={isVisible} closable={false} footer={null} title={null}>
      {showAuth && (
        <LoginContainerWrapper>
          <LoginContainer />
        </LoginContainerWrapper>
      )}
      {!showAuth &&
        showPhone &&
        (showConfirmationPage ? (
          <PhoneVerifyContainer />
        ) : (
          <PhoneEntryContainer />
        ))}
      {!showAuth && !showPhone && <PersonalDataFormContainer />}
    </Modal>
  );
};

const LoginContainerWrapper = styled.div`
  width: 100%;
  /* Firefox */
  display: -moz-box;
  -moz-box-pack: center;
  -moz-box-align: center;
  /* Safari and Chrome */
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  /* W3C */
  display: box;
  box-pack: center;
  box-align: center;
`;

export interface IAuthenticationModal {
  isVisible: boolean;
}

export default AuthenticationModal;
