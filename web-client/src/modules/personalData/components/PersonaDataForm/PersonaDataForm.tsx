import { Avatar, Button, Checkbox, Form, Input, Typography } from 'antd';
import words from 'lodash/words';
import React, { PureComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import firebase from 'src/firebase';
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

class CustomCheckbox extends PureComponent<Record<string, any>> {
  render() {
    const { initialValue, onChange, children } = this.props;
    return (
      <Checkbox
        defaultChecked={initialValue}
        onChange={({ target }) => onChange(target.checked)}
      >
        {children}
      </Checkbox>
    );
  }
}

interface NewRequestProps {
  handleFormSubmit: Function;
  user: firebase.User | null | undefined;
  profile: firebase.firestore.DocumentData | undefined;
  priviledgedInfo: firebase.firestore.DocumentData | undefined;
}

const PersonaDataForm: React.FC<NewRequestProps> = ({
  handleFormSubmit,
  user,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [displayPicture, setDisplayPicture] = useState('');

  useEffect(() => {
    setDisplayName(words(fullName)[0]);
  }, [fullName]);

  useEffect(() => {
    if (user && user.displayName && user.photoURL) {
      setFullName(user.displayName);
      setDisplayName(user.displayName);
      setDisplayPicture(user.photoURL);
    }
  }, [user]);

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
        <Avatar shape="square" src={displayPicture} size={312} />
        <Form.Item name="profilepic">
          <CustomCheckbox>Use This Picture</CustomCheckbox>
        </Form.Item>
        <Description>{t('user_data_form.sub_title')}</Description>
        <Form.Item
          style={{ textAlign: 'center', width: '100%' }}
          name="name"
          rules={[
            {
              required: true,
              message: t('user_data_form.full_name_error_message'),
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
              placeholder={t('full_name')}
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
            <Input
              placeholder={t('display_name')}
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
            />
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
          <CustomCheckbox initialValue={false}>
            {t('user_data_form.terms_conditions_text')}
            <Link to="/">{t('user_data_form.terms_conditions_link')}</Link>
          </CustomCheckbox>
        </Form.Item>
        <Form.Item>
          <StyledButton id="submitButton" htmlType="submit" type="primary">
            {t('continue')}
          </StyledButton>
        </Form.Item>
      </Form>
    </StyledIntro>
  );
};

export default PersonaDataForm;
