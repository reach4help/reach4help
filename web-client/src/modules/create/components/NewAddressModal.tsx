import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, Col, Form, Input, Modal, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { MediumCancelButton, MediumSaveButton } from 'src/components/Buttons';
import { GeocoderComponent } from 'src/components/Geocoder/Geocoder';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { IUserAddress } from 'src/models/users/privilegedInformation';

const NewAddressForm: React.FC<NewAddressFormProps> = geocode => {
  const form = useForm();

  console.log('geocode is ', geocode);
  const cancelHandler = () => console.log('cancel');
  const handleFinish = () => {
    geocode({
      name: '22 strawberry fields',
      address1: '555 5th avenue',
      address2: '',
      city: 'New York',
      state: 'New York',
      postalCode: '10012',
      country: 'United States',
    });
    console.log('finished');
  };
  const [shouldSave, setShouldSave] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <Form form={form[0]} onFinish={handleFinish}>
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
        <Row gutter={[16, 6]}>
          <Checkbox onChange={() => setShouldSave(true)}>
            {t('settings.changeAddressForm.saveChangesCheckbox')}
          </Checkbox>
        </Row>
      </>
      <Row>
        <Col span={11}>
          <MediumCancelButton onClick={() => cancelHandler()}>
            <CloseOutlined />
            {t('settings.changeAddressForm.cancel')}
          </MediumCancelButton>
        </Col>
        <Col span={11} offset={2}>
          <MediumSaveButton htmlType="submit">
            <CheckOutlined />
            {t('settings.changeAddressForm.next')}
          </MediumSaveButton>
        </Col>
      </Row>
    </Form>
  );
};

interface NewAddressFormProps {
  geocode: (
    address: Pick<IUserAddress, Exclude<keyof IUserAddress, 'coords'>>,
  ) => Promise<IUserAddress>;
}

export const NewAddressModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <GeocoderComponent<NewAddressFormProps>
        otherProps={{}}
        Component={NewAddressForm}
      />
    </Modal>
  );
};
