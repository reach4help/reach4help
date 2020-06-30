import { UserOutlined } from '@ant-design/icons/lib';
import { Col, Form, Input, Modal, Row } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ModalCancelButton, ModalContinueButton } from '../Buttons';
import { H4Font } from '../figma';

export const ChangeNameModal: React.FC<ChangeNameModalProps> = ({
  changeNameHandler,
  showModal,
  closeModal,
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
    <Modal
          visible={showModal}
          onCancel={closeModal}
          footer={null}
      >
      <>
        <H4Font>
          <UserOutlined />
          {t('settings.changeName')}
        </H4Font>
        <Form
            layout="vertical"
            form={form}
            onFinish={values => {
                changeNameHandler(
                  values.displayName,
                  values.username,
              );
            }}
        >
          <Row gutter={12}>
            <Col span={24} md={12}>
              <Form.Item
                  name="displayName"
                  rules={[
                    {
                      required: true,
                      message: t(
                          'settings.changeNameForm.full_name_error_message',
                      ),
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
                      message: t(
                          'settings.changeNameForm.display_name_error_message',
                      ),
                    },
                  ]}
              >
                <Input
                    placeholder={t('display_name_placeholder')}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <ModalCancelButton onClick={() => closeModal()}>
                {t('settings.changeNameForm.cancel')}
              </ModalCancelButton>
            </Col>
            <Col span={11} offset={2}>
              <ModalContinueButton htmlType="submit">
                {t('settings.changeNameForm.submit')}
              </ModalContinueButton>
            </Col>
          </Row>
        </Form>
      </>
    </Modal>
  );
};

interface ChangeNameModalProps {
  changeNameHandler: Function;
  showModal: boolean;
  closeModal: () => void;
  initialValues: {
      displayName: string | null;
      username: string | null;
  };
}
