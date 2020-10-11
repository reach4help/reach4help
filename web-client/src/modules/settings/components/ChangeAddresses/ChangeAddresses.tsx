import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import firebase from 'firebase';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store';

import {
  MediumCancelButton,
  MediumSaveButton,
} from '../../../../components/Buttons';

export const ChangeAddresses: React.FC<ChangeAddressesProps> = ({
  changeAddressesHandler,
  cancelHandler,
}) => {
  const { t } = useTranslation();
  const [form] = useForm();
  const addresses = useSelector(
    (state: AppState) => state.profile.privilegedInformation?.addresses,
  );
  const addressesOptions = addresses
    ? Object.keys(addresses)
    : ([] as string[]);

  const defaultAddressName = addresses
    ? 'default' in addresses
      ? 'default'
      : addressesOptions[0]
    : '';
  const defaultAddress =
    addresses && defaultAddressName.length > 0 && addresses[defaultAddressName];
  const formInitial = defaultAddress
    ? {
        current: defaultAddressName,
        name: defaultAddress.name || 'default',
        address1: defaultAddress.address1,
        address2: defaultAddress.address2,
        city: defaultAddress.city,
        state: defaultAddress.state,
        postalCode: defaultAddress.postalCode,
        country: defaultAddress.country,
      }
    : {
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
      const currentAddress = addresses[currentName];
      form.setFieldsValue({
        name: currentAddress.name || 'default',
        address1: currentAddress.address1,
        address2: currentAddress.address2,
        city: currentAddress.city,
        state: currentAddress.state,
        postalCode: currentAddress.postalCode,
        country: currentAddress.country,
      });
    }
  };

  const handleFinish = value => {
    if (!addresses) {
      return;
    }
    const newAddress = {
      name: value.name,
      address1: value.address1,
      address2: value.address2,
      city: value.city,
      state: value.state,
      postalCode: value.postalCode,
      country: value.country,
    };
    const newAddresses = addresses;
    if (value.current in newAddresses) {
      newAddresses[value.name] = {
        ...newAddresses[value.current],
        ...newAddress,
      };
      delete newAddresses[value.current];
    } else {
      newAddresses[value.name] = {
        ...newAddress,
        coords: new firebase.firestore.GeoPoint(0, 0),
      };
    }
    changeAddressesHandler(newAddresses);
  };

  const handleCancelHandler = () => {
    if (!addresses) {
      return;
    }
    const currentSelectedName = form.getFieldValue('current');
    if (currentSelectedName === 'add') {
      form.setFieldsValue({
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      });
      return;
    }
    const currentAddress = addresses[currentSelectedName];
    form.setFieldsValue({
      current: currentAddress.name || 'default',
      name: currentAddress.name,
      address1: currentAddress.address1,
      address2: currentAddress.address2,
      city: currentAddress.city,
      state: currentAddress.state,
      postalCode: currentAddress.postalCode,
      country: currentAddress.country,
    });
    cancelHandler();
  };

  useEffect(() => {
    const currentName = form.getFieldValue('current');
    if (addresses && currentName) {
      const currentAddress = addresses[currentName];
      form.setFieldsValue({
        name: currentAddress.name,
        address1: currentAddress.address1,
        address2: currentAddress.address2,
        city: currentAddress.city,
        state: currentAddress.state,
        postalCode: currentAddress.postalCode,
        country: currentAddress.country,
      });
    }
  }, [addresses, form]);

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
                ;
                {addressesOptions &&
                  addressesOptions.map((addressesKey: string) => (
                    <Select.Option key={addressesKey} value={addressesKey}>
                      {addressesKey}
                    </Select.Option>
                  ))}
                <Select.Option value="add">Add a new one</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 6]}>
          <Col span={24}>
            <Form.Item
              name="name"
              label={t('settings.changeAddressForm.nameOfAddress')}
            >
              <Input id="nameofAddress" />
            </Form.Item>
          </Col>
        </Row>
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
        <Row>
          <Col span={11}>
            <MediumCancelButton onClick={() => handleCancelHandler()}>
              <CloseOutlined />
              {t('settings.changeAddressForm.cancel')}
            </MediumCancelButton>
          </Col>
          <Col span={11} offset={2}>
            <MediumSaveButton htmlType="submit">
              <CheckOutlined />
              {t('settings.changeAddressForm.submit')}
            </MediumSaveButton>
          </Col>
        </Row>
      </Form>
    </>
  );
};

interface ChangeAddressesProps {
  changeAddressesHandler: Function;
  cancelHandler: () => void;
}
