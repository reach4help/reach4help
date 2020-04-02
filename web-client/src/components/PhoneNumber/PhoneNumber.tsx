import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import logo from '../../assets/logo.png';
import TitleWithAddon from '../TitleWithAddon/TitleWithAddon';

const { Text } = Typography;

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
`;

const Logo = styled.img`
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
      <Logo src={logo} alt="logo" />
      <TitleWithAddon level={4}>{t('welcome')}</TitleWithAddon>
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
          <StyledButton htmlType="submit" type="primary">
            {t('continue')}
          </StyledButton>
        </Form.Item>
      </Form>
    </StyledIntro>
  );
};

export default PhoneNumber;
