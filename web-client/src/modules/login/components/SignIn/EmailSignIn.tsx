import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logoSmall from 'src/assets/logoSmall.png';
import { LogoWrapper, StepWrapper } from 'src/components/figma/';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import styled from 'styled-components';

const EmailSignIn: React.FC<EmailSignInProps> = ({
  submitHandler,
}): React.ReactElement<EmailSignInProps> => {
  const { t } = useTranslation();

  return (
    <StepWrapper>
      <LogoWrapper>
        <img src={logoSmall} alt="logo" height="50px" width="50px" />
      </LogoWrapper>
      <TitleWrapper>
        <TitleWithAddon level={2} alignAddon="50%">
          {t('login.sign_in.title')}
        </TitleWithAddon>
      </TitleWrapper>
      <Form
        layout="vertical"
        name="emailSignin"
        initialValues={{ remember: true }}
        onFinish={({ email, password }) => submitHandler(email, password)}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: t('login.steps.4_email_signup.email_error_message'),
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
              message: t('login.sign_in.password_error_message'),
            },
          ]}
          label={t('login.sign_in.password_label')}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <RegistrationButtonsPanel>
            <RegistrationButtonWrapper>
              <Button
                type="primary"
                htmlType="submit"
                icon={<ArrowRightOutlined />}
              >
                {t('continue')}{' '}
              </Button>
            </RegistrationButtonWrapper>
          </RegistrationButtonsPanel>
        </Form.Item>
      </Form>
    </StepWrapper>
  );
};

const RegistrationButtonsPanel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const RegistrationButtonWrapper = styled.div`
  flex: 1 1 auto;
`;

const TitleWrapper = styled.div`
  margin: 20px 0 30px;
`;
interface EmailSignInProps {
  submitHandler: Function;
}

export default EmailSignIn;
