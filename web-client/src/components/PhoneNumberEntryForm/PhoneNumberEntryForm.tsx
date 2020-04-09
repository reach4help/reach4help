import { Button, Form, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import firebase from 'src/firebase';
import styled from 'styled-components';

const { Text } = Typography;

const Description = styled(Text)`
  margin-top: 3rem;
  text-align: center;
`;

const StyledInput = styled(Input)`
  margin-top: 1rem;
  width: 11rem;
`;

const Info = styled(Text)`
  color: #ddd;
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
`;

interface NewRequestProps {
  handleFormSubmit: Function;
  loading: boolean;
}

const PhoneNumberEntryForm: React.FC<NewRequestProps> = ({
  handleFormSubmit,
  loading,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [recaptchaVerifier, setRecaptchaVerifier] = useState({});

  useEffect(() => {
    const appVerifier = new firebase.auth.RecaptchaVerifier('submitButton', {
      size: 'invisible',
    });
    setRecaptchaVerifier(appVerifier);
  }, []);

  return (
    <Form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      layout="vertical"
      form={form}
      onFinish={({ phoneNumber }) => {
        handleFormSubmit({ phoneNumber }, recaptchaVerifier);
      }}
    >
      <Description>{t('phoneNumber.sub_title')}</Description>
      <Form.Item
        style={{ textAlign: 'center' }}
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: t('phoneNumber.error_message'),
          },
        ]}
      >
        <StyledInput placeholder="+0 000 000 000 000" maxLength={14} />
      </Form.Item>
      <Info>{t('phoneNumber.info')}</Info>
      <Form.Item>
        <StyledButton
          loading={loading}
          id="submitButton"
          htmlType="submit"
          type="primary"
        >
          {t('continue')}
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

export default PhoneNumberEntryForm;
