import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import logo from '../../assets/logo.png';

const { Text } = Typography;

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
`;

const Avatar = styled.img`
  height: 125px;
  width: 125px;
`;

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
}

const PhoneNumber: React.FC<NewRequestProps> = ({
  handleFormSubmit,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <StyledIntro>
      <Avatar src={logo} alt="avatar" />
      <Form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        layout="vertical"
        form={form}
        onFinish={values => {
          handleFormSubmit(values);
        }}
      >
        <Description>{t('verificationCode.sub_title')}</Description>
        <Form.Item
          style={{ textAlign: 'center' }}
          name="confirmationCode"
          rules={[
            {
              required: true,
              message: t('verificationCode.error_message'),
            },
          ]}
        >
          <StyledInput placeholder="000 000" maxLength={14} />
        </Form.Item>
        <Info>
          {t('verificationCode.info')}
          <a href="#">{t('verificationCode.resend')}</a>
        </Info>
        <Form.Item>
          <StyledButton htmlType="submit" type="primary">
            {t('continue')}
          </StyledButton>
        </Form.Item>
      </Form>
    </StyledIntro>
  );
};

export default PhoneNumber;
