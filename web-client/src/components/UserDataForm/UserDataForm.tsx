import { Button, Checkbox, Form, Input, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Text } = Typography;

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
`;

const Description = styled(Text)`
  margin-top: 3rem;
  text-align: center;
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

const UserDataForm: React.FC<NewRequestProps> = ({
  handleFormSubmit,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <StyledIntro>
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
        <Description>{t('user_data_form.sub_title')}</Description>
        <Form.Item
          style={{ textAlign: 'center', width: '100%' }}
          name="firstName"
          rules={[
            {
              required: true,
            },
          ]}
          label={t('name')}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Input
              style={{
                marginRight: '15px',
              }}
              placeholder={t('first_name')}
            />
            <Input placeholder={t('last_name')} />
          </div>
        </Form.Item>
        <Form.Item
          style={{ textAlign: 'center', width: '100%' }}
          name="address"
          rules={[
            {
              required: true,
            },
          ]}
          label={t('address')}
        >
          <Input placeholder={t('address')} />
        </Form.Item>
        <Form.Item
          style={{ textAlign: 'center', width: '100%' }}
          name="firstName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Input
              style={{
                marginRight: '15px',
              }}
              placeholder={t('city')}
            />
            <Input
              style={{
                marginRight: '15px',
              }}
              placeholder={t('code')}
            />
            <Input placeholder={t('country')} />
          </div>
        </Form.Item>
        <Info>
          {t('user_data_form.policy_text')}{' '}
          <Link to="/">{t('user_data_form.policy_link')}</Link>
        </Info>
        <Form.Item
          style={{ textAlign: 'center' }}
          name="terms"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>
            {t('user_data_form.terms_conditions_text')}
            <Link to="/">{t('user_data_form.terms_conditions_link')}</Link>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <StyledButton htmlType="submit" type="primary">
            {t('continue')}
          </StyledButton>
        </Form.Item>
      </Form>
    </StyledIntro>
  );
};

export default UserDataForm;
