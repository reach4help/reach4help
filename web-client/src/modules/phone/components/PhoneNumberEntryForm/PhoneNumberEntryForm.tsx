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

interface PhoneNumberEntryFormProps {
  handleFormSubmit: Function;
  loading: boolean;
  reset: boolean;
}

const PhoneNumberEntryForm: React.FC<PhoneNumberEntryFormProps> = ({
  handleFormSubmit,
  loading,
  reset,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [recaptchaVerifier, setRecaptchaVerifier] = useState({});
  const [resetState, setResetState] = useState(false);

  useEffect(() => {
    const appVerifier = new firebase.auth.RecaptchaVerifier('submitButton', {
      size: 'invisible',
    });
    setRecaptchaVerifier(appVerifier);
  }, []);

  // TODO: FIND A BETTER SOLUTION TO RESET RECAPTCHA
  useEffect(() => {
    if (reset) {
      setRecaptchaVerifier({});
      setResetState(true);
    }
  }, [reset]);

  useEffect(() => {
    if (resetState) {
      setResetState(false);
      form.resetFields();
    } else if (reset) {
      const appVerifier = new firebase.auth.RecaptchaVerifier('submitButton', {
        size: 'invisible',
      });
      setRecaptchaVerifier(appVerifier);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetState]);

  if (resetState) {
    return <></>;
  }

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
        handleFormSubmit(
          { phoneNumber: phoneNumber.replace(/\s/g, '') },
          recaptchaVerifier,
        );
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
          {
            validator: (_, value) =>
              value.length < 11
                ? Promise.resolve()
                : // eslint-disable-next-line no-useless-escape
                /[~`!#$%\^&*=\-\[\]\\';\s,/(){}|\\":<>\?]/g.test(value)
                ? Promise.reject(t('phoneNumber.phone_valid'))
                : Promise.resolve(),
          },
          {
            min: 11,
            message: t('phoneNumber.phone_valid'),
          },
        ]}
      >
        <StyledInput placeholder="+0000000000000" maxLength={14} />
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
