import { Alert, Col, Form, Input, Modal, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { GeocoderComponent } from 'src/components/Geocoder/Geocoder';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import { updateUserPrivilegedInformation } from 'src/ducks/profile/actions';
import { IUserAddress } from 'src/models/users/privilegedInformation';
import { AppState } from 'src/store';

const ModalForm: React.FC<ModalFormProps> = ({
  geocode,
  visible,
  closeModal,
  modalSuccess,
  geocodeFailed = false,
  onGeocodeFail,
}) => {
  const [form] = useForm();
  const dispatch = useDispatch();

  const [shouldSave, setShouldSave] = useState<boolean>(false);

  const addresses = useSelector(
    (state: AppState) => state.profile.privilegedInformation?.addresses,
  );
  const privilegedInformation = useSelector(
    (state: AppState) => state.profile.privilegedInformation,
  );
  const userId = useSelector((state: AppState) => state.auth.user?.uid);

  const handleFinish = () => {
    const {
      name,
      address1,
      address2,
      city,
      state,
      postalCode,
      country,
    } = form.getFieldsValue();
    if (addresses && addresses[name]) {
      alert('you have already used that name');
      return;
    }
    geocode({
      name,
      address1,
      address2,
      city,
      state,
      postalCode,
      country,
    })
      .then(geocodedResult => {
        modalSuccess(geocodedResult);
        if (shouldSave) {
          if (privilegedInformation && userId) {
            const addressesToSave = {
              ...addresses,
            };
            addressesToSave[geocodedResult.name] = geocodedResult;
            privilegedInformation.addresses = addressesToSave;
            dispatch(
              updateUserPrivilegedInformation(userId, privilegedInformation),
            );
          }
        }
      })
      .catch(error => {
        onGeocodeFail();
        // eslint-disable-next-line no-console
        console.error('could not geocode', error);
      });
  };

  const { t } = useTranslation();
  return (
    <Modal visible={visible} onOk={handleFinish} onCancel={closeModal}>
      <Form form={form} onFinish={handleFinish}>
        <>
          {geocodeFailed && (
            <Alert
              style={{ marginTop: '20px' }}
              message="Address Error"
              description="That location could not be found.  Please try again"
              type="error"
              closable
            />
          )}
          <TitleWithUnderline level={3}>
            {t('settings.changeAddressForm.address')}
          </TitleWithUnderline>
          <Row gutter={[16, 6]}>
            <Col span={24}>
              <Form.Item name="address1" label={t('address1')}>
                <Input placeholder={t('address1')} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 6]}>
            <Col span={24}>
              <Form.Item name="address2" label={t('address2')}>
                <Input placeholder={t('address2')} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name="city" label={t('city')}>
                <Input placeholder={t('city')} />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item name="state" label={t('State')}>
                <Input placeholder={t('State')} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name="postalCode" label={t('code')}>
                <Input placeholder={t('code')} />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item name="country" label={t('country')}>
                <Input placeholder={t('country')} />
              </Form.Item>
            </Col>
          </Row>
          {shouldSave && (
            <Row gutter={[16, 6]}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  required
                  label={t('settings.changeAddressForm.nameOfAddress')}
                >
                  <Input id="nameofAddress" />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={[16, 6]}>
            <input
              type="checkbox"
              onChange={e => {
                e.target.checked && setShouldSave(true);
              }}
            />{' '}
            {t('settings.changeAddressForm.saveChangesCheckbox')}
          </Row>
        </>
      </Form>
    </Modal>
  );
};

interface ModalFormProps {
  geocode: (
    address: Pick<IUserAddress, Exclude<keyof IUserAddress, 'coords'>>,
  ) => Promise<IUserAddress>;
  closeModal: () => void;
  visible: boolean;
  modalSuccess: (any) => void;
  geocodeFailed: boolean;
  onGeocodeFail: () => void;
}

const NewAddressModal: React.FC<NewAddressModalProps> = ({
  visible,
  closeModal,
  modalSuccess,
  geocodeFailed = false,
  onGeocodeFail,
}) => (
  <GeocoderComponent<ModalFormProps>
    otherProps={{
      visible,
      closeModal,
      modalSuccess,
      geocodeFailed,
      onGeocodeFail,
    }}
    Component={ModalForm}
  />
);

interface NewAddressModalProps {
  visible: boolean;
  closeModal: () => void;
  modalSuccess: (any) => void;
  geocodeFailed?: boolean;
  onGeocodeFail: () => void;
}

export default NewAddressModal;
