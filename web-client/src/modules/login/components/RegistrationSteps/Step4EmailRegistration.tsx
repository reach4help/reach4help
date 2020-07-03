import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logoSmall from 'src/assets/logoSmall.png';
import {
  ButtonWrapper,
  LoginButtonsWrapper,
  LogoWrapper,
  StepWrapper,
} from 'src/components/figma/';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';

const Step4EmailRegistration: React.FC<Step4EmailRegistrationProps> = ({
  backHandler,
  submitHandler,
}): React.ReactElement<Step4EmailRegistrationProps> => {
  const { t } = useTranslation();

  return (
    <StepWrapper>
      <LogoWrapper>
        <img src={logoSmall} alt="logo" height="50px" width="50px" />
      </LogoWrapper>
      <TitleWithAddon level={2} alignAddon="50%">
        Continue with email
      </TitleWithAddon>
      <Form
        layout="vertical"
        name="emailSignup"
        initialValues={{ remember: true }}
        onFinish={({ email, password }) => submitHandler(email, password)}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: t('login.steps.4_email_signup.email_message'),
            },
          ]}
          label={t('login.steps.4_email_signup.email_label')}
        >
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
          label={t('login.steps.4_email_signup.password_label')}
        >
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
          label={t('login.steps.4_email_signup.password_confirm_label')}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
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
    </StepWrapper>
  );
};

interface Step4EmailRegistrationProps {
  backHandler: () => void;
  submitHandler: Function;
}

export default Step4EmailRegistration;
