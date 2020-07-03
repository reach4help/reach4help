import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  MediumCancelButton,
  MediumSaveButton,
} from '../../../../components/Buttons';

export const ChangeName: React.FC<ChangeNameProps> = ({
  changeNameHandler,
  cancelHandler,
  initialValues,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      displayName: initialValues.displayName,
      username: initialValues.username,
    });
  }, [form, initialValues]);

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={values => {
          changeNameHandler(values.displayName, values.username);
        }}
      >
        <Row gutter={12}>
          <Col span={24} md={12}>
            <Form.Item
              name="displayName"
              rules={[
                {
                  required: true,
                  message: `${t(
                    'settings.changeNameForm.full_name_error_message',
                  )}.`,
                },
              ]}
              label={t('name')}
            >
              <Input
                style={{
                  marginRight: '15px',
                }}
                placeholder={t('full_name')}
              />
            </Form.Item>
          </Col>
          <Col span="24" md={12}>
            <Form.Item
              name="username"
              label={t('display_name')}
              rules={[
                {
                  required: true,
                  message: `${t(
                    'settings.changeNameForm.display_name_error_message',
                  )}.`,
                },
              ]}
            >
              <Input placeholder={t('display_name_placeholder')} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <MediumCancelButton onClick={() => cancelHandler()}>
              <CloseOutlined />
              {t('settings.changeNameForm.cancel')}
            </MediumCancelButton>
          </Col>
          <Col span={11} offset={2}>
            <MediumSaveButton htmlType="submit">
              <CheckOutlined />
              {t('settings.changeNameForm.submit')}
            </MediumSaveButton>
          </Col>
        </Row>
      </Form>
    </>
  );
};

interface ChangeNameProps {
  changeNameHandler: Function;
  cancelHandler: () => void;
  initialValues: {
    displayName: string | null;
    username: string | null;
  };
}
