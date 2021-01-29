import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logoSmall from 'src/assets/logoSmall.png';
import { FormWrapper, LogoWrapper, StepWrapper } from 'src/components/figma/';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import styled from 'styled-components';

const EmailSignIn: React.FC<EmailSignInProps> = ({
  submitHandler,
  goToSignUp,
  goBack,
}): React.ReactElement<EmailSignInProps> => {
  const { t } = useTranslation();

  return (
    <StepWrapper>
      <LogoWrapper style={{ marginBottom: 0 }}>
        <img src={logoSmall} alt="logo" height="70px" width="70px" />
      </LogoWrapper>
      <TitleWrapper>
        <TitleWithUnderline level={2}>
          {t('login.sign_in.title')}
        </TitleWithUnderline>
      </TitleWrapper>
      <FormWrapper>
        <Form
          layout="vertical"
          name="emailSignin"
          initialValues={{ remember: true }}
          onFinish={({ email, password }) => submitHandler(email, password)}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: t('login.steps.3_email_signin.email_error_message'),
              },
            ]}
            label={t('login.steps.3_email_signin.email_label')}
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

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <TextLink>Forgot password</TextLink> */}
            <TextLink onClick={() => goToSignUp()}>
              New user? Sign up instead
            </TextLink>
          </div>

          <Form.Item>
            <RegistrationButtonsPanel>
              <RegistrationButtonWrapper style={{ flexGrow: 2 }}>
                <Button onClick={() => goBack()}> X {t('cancel')} </Button>
              </RegistrationButtonWrapper>
              <RegistrationButtonWrapper style={{ flexGrow: 5 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<ArrowRightOutlined />}
                  style={{ minWidth: '165px' }}
                >
                  {t('login.steps.3_email_signin.signin')}{' '}
                </Button>
              </RegistrationButtonWrapper>
            </RegistrationButtonsPanel>
          </Form.Item>
        </Form>
      </FormWrapper>
    </StepWrapper>
  );
};

const RegistrationButtonsPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  margin: 10px 0;
`;

const RegistrationButtonWrapper = styled.div`
  padding: 5px;

  .ant-btn {
    width: 100%;
  }
`;

const TextLink = styled.span`
  color: #1890ff;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  margin: 20px 0;
`;

interface EmailSignInProps {
  submitHandler: Function;
  goToSignUp: Function;
  goBack: Function;
}

export default EmailSignIn;
