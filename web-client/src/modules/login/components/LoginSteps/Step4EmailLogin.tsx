import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logoSmall from 'src/assets/logoSmall.png';
import {
  ButtonWrapper,
  FormLabel,
  H6Font,
  LoginButtonsWrapper,
  LogoWrapper,
} from 'src/components/figma/';

const Step4EmailLogin: React.FC<Step4EmailLoginProps> = ({
  backHandler,
  submitHandler,
}): React.ReactElement<Step4EmailLoginProps> => {
  const { t } = useTranslation();

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
        onFinish={submitHandler}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: t('login.steps.4_email_signup.email_message'),
            },
          ]}
        >
          <FormLabel>
            <H6Font>{t('login.steps.4_email_signup.email_label')}</H6Font>
          </FormLabel>
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t('login.steps.4_email_signup.password_message'),
            },
          ]}
        >
          <FormLabel>
            <H6Font>{t('login.steps.4_email_signup.password_label')}</H6Font>
          </FormLabel>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: t('login.steps.4_email_signup.password_confirm_message'),
            },
          ]}
        >
          <FormLabel>
            <H6Font>
              {t('login.steps.4_email_signup.password_confirm_label')}
            </H6Font>
          </FormLabel>
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
              <Button type="default" htmlType="button" onClick={backHandler}>
                {t('back')}
              </Button>
            </ButtonWrapper>
          </LoginButtonsWrapper>
        </Form.Item>
      </Form>
    </>
  );
};

interface Step4EmailLoginProps {
  backHandler: () => void;
  submitHandler: () => void;
}

export default Step4EmailLogin;
