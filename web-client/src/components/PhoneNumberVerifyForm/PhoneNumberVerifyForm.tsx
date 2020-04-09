import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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

const PhoneNumberVerifyForm: React.FC<NewRequestProps> = ({
  handleFormSubmit,
  loading,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      layout="vertical"
      form={form}
      onFinish={({ otp }) => {
        handleFormSubmit({ otp });
      }}
    >
      <Description>{t('verificationCode.sub_title')}</Description>
      <Form.Item
        style={{ textAlign: 'center' }}
        name="otp"
        rules={[
          {
            required: true,
            message: t('verificationCode.error_message'),
          },
        ]}
      >
        <StyledInput placeholder="123456" maxLength={6} />
      </Form.Item>
      <Info>
        {t('verificationCode.info')}
        <Link to="/phone">{t('verificationCode.resend')}</Link>
      </Info>
      <Form.Item>
        <StyledButton loading={loading} htmlType="submit" type="primary">
          {t('verify')}
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

export default PhoneNumberVerifyForm;
