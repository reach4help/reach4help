import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logoSmall from 'src/assets/logoSmall.png';
import { FormWrapper, LogoWrapper, StepWrapper } from 'src/components/figma/';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import styled from 'styled-components';

const Step4EmailRegistration: React.FC<Step4EmailRegistrationProps> = ({
  backHandler,
  goToSignIn,
  submitHandler,
}): React.ReactElement<Step4EmailRegistrationProps> => {
  const { t } = useTranslation();

  return (
    <StepWrapper>
      <LogoWrapper style={{ marginBottom: 0 }}>
        <img src={logoSmall} alt="logo" height="70px" width="70px" />
      </LogoWrapper>
      <TitleWrapper>
        <TitleWithUnderline level={2}>
          {t('login.steps.4_email_signup.title')}
        </TitleWithUnderline>
      </TitleWrapper>
      <FormWrapper>
        <Form
          layout="vertical"
          name="emailSignup"
          initialValues={{ remember: true }}
          onFinish={({ email, password }) => submitHandler(email, password)}
          size="large"
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
            name="confirm"
            label={t('login.steps.4_email_signup.password_confirm_label')}
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: t(
                  'login.steps.4_email_signup.password_confirm_empty_message',
                ),
              },
              ({ getFieldValue }) => ({
                validator: (_, confirmPassword) => {
                  const password = getFieldValue('password');
                  if (!password || password === confirmPassword) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    t(
                      'login.steps.4_email_signup.password_confirm_error_message',
                    ),
                  );
                },
              }),
            ]}
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
            <TextLink onClick={() => goToSignIn()}>
              Already a user? Login instead.
            </TextLink>
          </div>

          <Form.Item>
            <RegistrationButtonsPanel>
              <RegistrationButtonWrapper style={{ flexGrow: 2 }}>
                <Button onClick={backHandler}> X {t('cancel')} </Button>
              </RegistrationButtonWrapper>
              <RegistrationButtonWrapper style={{ flexGrow: 5 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<ArrowRightOutlined />}
                  style={{ minWidth: 0 }}
                >
                  {t('login.steps.4_email_signup.create_account')}{' '}
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
  justify-content: space-between;
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

interface Step4EmailRegistrationProps {
  backHandler: () => void;
  goToSignIn: Function;
  submitHandler: Function;
}

export default Step4EmailRegistration;
