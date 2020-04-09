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
          name="fullName"
          rules={[
            {
              required: true,
              message: t('user_data_form.full_name_error_message'),
            },
          ]}
          label={t('full_name')}
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
              placeholder={t('full_name')}
            />
            <Input placeholder={t('display_name')} />
          </div>
        </Form.Item>
        <Form.Item
          style={{ textAlign: 'center', width: '100%' }}
          name="address"
          rules={[
            {
              required: true,
              message: t('user_data_form.address_error_message'),
            },
          ]}
          label={t('address')}
        >
          <Input placeholder={t('address')} />
        </Form.Item>
        <Form.Item
          style={{ textAlign: 'center', width: '100%' }}
          rules={[
            {
              required: true,
              message: t('user_data_form.address_error_message'),
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
              message: t('user_data_form.terms_conditions_error'),
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
