import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'src/components/figma/Modal';
import LoginContainer from 'src/modules/login/containers/LoginContainer/LoginContainer';
import PersonalDataFormContainer from 'src/modules/personalData/containers/PersonalDataFormContainer/PersonalDataFormContainer';
import PhoneEntryContainer from 'src/modules/phone/containers/PhoneEntryContainer/PhoneEntryContainer';
import PhoneVerifyContainer from 'src/modules/phone/containers/PhoneVerifyContainer/PhoneVerifyContainer';
import { AppState } from 'src/store';

const AuthenticationModal: React.FC = () => {
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
    <Modal visible closable={false} footer={null} title={null}>
      {showAuth && <LoginContainer />}
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

export default AuthenticationModal;
