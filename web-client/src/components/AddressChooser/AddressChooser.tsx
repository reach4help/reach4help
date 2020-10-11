import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPrivilegedInformation } from 'src/ducks/profile/actions';
import { IUserAddress } from 'src/models/users/privilegedInformation';
import { AppState } from 'src/store';

import { MediumCancelButton, MediumSaveButton } from '../Buttons';
import { GeocoderComponent } from '../Geocoder/Geocoder';

const AddressChooserComponent: React.FC<AddressChooserWrapped> = ({
  actionHandler,
  actionType,
  cancelHandler,
  cancelType,
  isSettings = false,
  geocode,
}) => {
  const { t } = useTranslation();
  const [form] = useForm();
  const [addressChosen, setAddressChosen] = useState<boolean>(false);
  const [shouldSave, setShouldSave] = useState<boolean>(isSettings);

  const addresses = useSelector(
    (state: AppState) => state.profile.privilegedInformation?.addresses,
  );

  const privilegedInformation = useSelector(
    (state: AppState) => state.profile.privilegedInformation,
  );

  const userId = useSelector((state: AppState) => state.auth.user?.uid);

  const dispatch = useDispatch();

  const formInitial = {
    current: '',
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  };
  const handleNameSelected = () => {
    if (!addresses) {
      return;
    }
    setAddressChosen(true);
    const currentName = form.getFieldValue('current');
    if (currentName === 'add') {
      form.setFieldsValue({
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      });
    } else {
      const chosenAddress = addresses[currentName];
      form.setFieldsValue({
        name: chosenAddress.name || 'default',
        address1: chosenAddress.address1,
        address2: chosenAddress.address2,
        city: chosenAddress.city,
        state: chosenAddress.state,
        postalCode: chosenAddress.postalCode,
        country: chosenAddress.country,
      });
    }
  };

  const handleFinish = async () => {
    if (!addresses) {
      return;
    }
    const currentName = form.getFieldValue('current');
    if (currentName) {
      const chosenAddress: Pick<
        IUserAddress,
        Exclude<keyof IUserAddress, 'coords'>
      > = {
        name: form.getFieldValue('name'),
        address1: form.getFieldValue('address1'),
        address2: form.getFieldValue('address2'),
        city: form.getFieldValue('city'),
        state: form.getFieldValue('state'),
        postalCode: form.getFieldValue('postalCode'),
        country: form.getFieldValue('country'),
      };
      const chosenAddressWithCoords = await geocode(chosenAddress);
      if (shouldSave) {
        if (privilegedInformation && userId) {
          const addressesToSave = {
            ...addresses,
          };
          if (currentName !== chosenAddressWithCoords.name) {
            delete addressesToSave[currentName];
            addressesToSave[
              chosenAddressWithCoords.name
            ] = chosenAddressWithCoords;
          } else {
            addressesToSave[
              chosenAddressWithCoords.name
            ] = chosenAddressWithCoords;
          }
          privilegedInformation.addresses = addressesToSave;

          dispatch(
            updateUserPrivilegedInformation(userId, privilegedInformation),
          );
        }
      }
      actionHandler(chosenAddressWithCoords);
    } else {
      actionHandler(addresses[currentName]);
    }
    form.resetFields();
    setAddressChosen(false);
  };

  return (
    <>
      <Form form={form} onFinish={handleFinish} initialValues={formInitial}>
        <Row gutter={[16, 6]}>
          <Col span={24}>
            <Form.Item
              name="current"
              label={t('settings.changeAddressForm.deliveryAddress')}
            >
              <Select onSelect={handleNameSelected}>
                {Object.keys(addresses || {}).map((addressesKey: string) => (
                  <Select.Option key={addressesKey} value={addressesKey}>
                    {addressesKey}
                  </Select.Option>
                ))}
                <Select.Option value="add">Add a new one</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {addressChosen ? (
          <>
            <Row gutter={[16, 6]}>
              <Col span={24}>
                <Form.Item
                  name="address1"
                  label={t('settings.changeAddressForm.address')}
                >
                  <Input placeholder={t('address1')} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 6]}>
              <Col span={24}>
                <Form.Item name="address2">
                  <Input placeholder={t('address2')} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Form.Item name="city">
                  <Input placeholder={t('city')} />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <Form.Item name="state">
                  <Input placeholder={t('State')} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name="postalCode">
                  <Input placeholder={t('code')} />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <Form.Item name="country">
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
            {!isSettings && (
              <Row gutter={[16, 6]}>
                <Checkbox onChange={() => setShouldSave(true)}>
                  {t('settings.changeAddressForm.saveChangesCheckbox')}
                </Checkbox>
              </Row>
            )}
          </>
        ) : null}
        <Row>
          <Col span={11}>
            <MediumCancelButton onClick={() => cancelHandler()}>
              <CloseOutlined />
              {cancelType === 'cancel'
                ? t('settings.changeAddressForm.cancel')
                : t('settings.changeAddressForm.back')}
            </MediumCancelButton>
          </Col>
          <Col span={11} offset={2}>
            <MediumSaveButton htmlType="submit">
              <CheckOutlined />
              {actionType === 'submit'
                ? t('settings.changeAddressForm.submit')
                : t('settings.changeAddressForm.next')}
            </MediumSaveButton>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export const AddressChooser: React.FC<AddressChooserProps> = ({
  actionHandler,
  actionType,
  cancelHandler,
  cancelType,
  isSettings = false,
}) => (
  <GeocoderComponent<AddressChooserWrapped>
    otherProps={{
      actionHandler,
      actionType,
      cancelHandler,
      cancelType,
      isSettings,
    }}
    Component={AddressChooserComponent}
  />
);

export interface AddressChooserProps {
  actionHandler: (address: IUserAddress) => void;
  actionType: 'submit' | 'next';
  cancelHandler: () => void;
  cancelType: 'cancel' | 'back';
  isSettings: boolean;
}

interface AddressChooserWrapped extends AddressChooserProps {
  geocode: (
    address: Pick<IUserAddress, Exclude<keyof IUserAddress, 'coords'>>,
  ) => Promise<IUserAddress>;
}
