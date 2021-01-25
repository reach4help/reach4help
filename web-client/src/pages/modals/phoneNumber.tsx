import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'src/components/figma/Modal';
import PhoneEntryContainer from 'src/modules/phone/containers/PhoneEntryContainer/PhoneEntryContainer';
import PhoneVerifyContainer from 'src/modules/phone/containers/PhoneVerifyContainer/PhoneVerifyContainer';
import { AppState } from 'src/store';

const PhoneNumberModal: React.FC = () => {
  const [showConfirmationPage, setShowConfirmationPage] = useState<boolean>(
    false,
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const confirmationResult = useSelector(
    (state: AppState) => state.auth.confirmationResult,
  );

  const phoneNumber = useSelector(
    (state: AppState) => state.auth.user?.phoneNumber,
  );

  const profile = useSelector((state: AppState) => state.profile.profile);

  const newRequest = useSelector(
    (state: AppState) => state.myRequestReducer.newRequestTemp,
  );

  const newOffer = useSelector((state: AppState) => state.offers.newOfferTemp);

  useEffect(() => {
    if (confirmationResult) {
      setShowConfirmationPage(true);
    } else {
      setShowConfirmationPage(false);
    }
  }, [confirmationResult]);

  useEffect(() => {
    if (
      profile &&
      !phoneNumber &&
      ((newRequest && newRequest.requestPayload) ||
        (newOffer && newOffer.offerPayload))
    ) {
      //   let isRequest = newRequest && newRequest.requestPayload;
      setIsVisible(true);
    }
    if (isVisible && profile && phoneNumber) {
      setIsVisible(false);
    }
  }, [phoneNumber, profile, newRequest, isVisible, newOffer]);

  return (
    <Modal visible={isVisible} closable={false} footer={null} title={null}>
      {(showConfirmationPage && <PhoneVerifyContainer />) || (
        <PhoneEntryContainer />
      )}
    </Modal>
  );
};

export default PhoneNumberModal;
