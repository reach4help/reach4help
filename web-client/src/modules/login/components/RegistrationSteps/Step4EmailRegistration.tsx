import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logoSmall from 'src/assets/logoSmall.png';
import { LogoWrapper, StepWrapper } from 'src/components/figma/';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import styled from 'styled-components';

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
      <TitleWrapper>
        <TitleWithAddon level={2} alignAddon="50%">
          {t('login.steps.4_email_signup.title')}
        </TitleWithAddon>
      </TitleWrapper>
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
              message: t('login.steps.4_email_signup.password_error_message'),
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
              message: t(
                'login.steps.4_email_signup.password_confirm_error_message',
              ),
            },
          ]}
          label={t('login.steps.4_email_signup.password_confirm_label')}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <RegistrationButtonsPanel>
            <RegistrationButtonWrapper>
              <Button onClick={backHandler}> X {t('cancel')} </Button>
            </RegistrationButtonWrapper>
            <RegistrationButtonWrapper>
              <Button
                type="primary"
                htmlType="submit"
                icon={<ArrowRightOutlined />}
              >
                {t('login.steps.4_email_signup.create_account')}{' '}
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
interface Step4EmailRegistrationProps {
  backHandler: () => void;
  submitHandler: Function;
}

export default Step4EmailRegistration;
