import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logoSmall from 'src/assets/logoSmall.png';
import {
  ButtonWrapper,
  LoginButtonsWrapper,
  LogoWrapper,
} from 'src/components/figma/';

const Step4EmailLogin: React.FC<{}> = (): React.ReactElement<{}> => {
  const { t } = useTranslation();

  const onFinish = values => {
    // eslint-disable-next-line no-console
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <>
      <LogoWrapper>
        <img src={logoSmall} alt="logo" height="50px" width="50px" />
      </LogoWrapper>
      <Form
        {...layout}
        name="emailSignup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={t('email')}
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('password')}
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <LoginButtonsWrapper>
            <ButtonWrapper>
              <Button type="primary" htmlType="submit">
                {t('continue')}
              </Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button type="default" htmlType="button">
                {t('back')}
              </Button>
            </ButtonWrapper>
          </LoginButtonsWrapper>
        </Form.Item>
      </Form>
    </>
  );
};

export default Step4EmailLogin;
