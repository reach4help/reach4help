import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IUserAddress } from 'src/models/users/privilegedInformation';

import {
  MediumCancelButton,
  MediumSaveButton,
} from '../../../../components/Buttons';

export const ChangeAddresses: React.FC<ChangeAddressesProps> = ({
  changeAddressesHandler,
  cancelHandler,
  addresses,
}) => {
  const { t } = useTranslation();
  const addressesKeys = addresses ? Object.keys(addresses) : ([] as string[]);
  const defaultKey = addressesKeys.includes('default')
    ? 'default'
    : addressesKeys[0];
  const [currentAddressKey, setCurrentAddressKey] = useState<string>(
    defaultKey,
  );
  const [currentAddress, setCurrentAddress] = useState<
    IUserAddress | undefined
  >(addresses ? addresses.default : undefined);
  const [form] = Form.useForm();

  const handleCancelHandler = () => {
    cancelHandler();
  };

  const handleNameSelected = (value: string) => {
    if (addresses) {
      setCurrentAddressKey(value);
      setCurrentAddress(addresses[value]);
    }
  };

  const handleFinish = (): void => {
    if (addresses && currentAddress) {
      const newAddresses = addresses;
      newAddresses[currentAddressKey] = currentAddress;
      changeAddressesHandler(newAddresses);
    }
  };

  return (
    <>
      <Form form={form} onFinish={handleFinish}>
        <Row gutter={[16, 12]}>
          <Col span={24}>
            <Form.Item label={t('settings.changeAddressForm.deliveryAddress')}>
              <Select defaultValue={defaultKey} onSelect={handleNameSelected}>
                {addressesKeys.map((addressesKey: string) => (
                  <Select.Option key={addressesKey} value={addressesKey}>
                    {addressesKey}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 12]}>
          <Col span={24}>
            <Form.Item label={t('settings.changeAddressForm.nameOfAddress')}>
              <Input defaultValue={currentAddress?.name} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 12]}>
          <Col span={24}>
            <Form.Item label={t('settings.changeAddressForm.address')}>
              <Input defaultValue={currentAddress?.address1} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 12]}>
          <Col span={24}>
            <Form.Item>
              <Input defaultValue={currentAddress?.address2} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 12]}>
          <Col span={12}>
            <Form.Item>
              <Input defaultValue={currentAddress?.city} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Input defaultValue={currentAddress?.state} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Input defaultValue={currentAddress?.country} />
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
  addresses: Record<string, IUserAddress> | undefined;
}
