import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import words from 'lodash/words';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import gpstarget from '../../../../assets/gpstarget.svg';

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

const GPSButton = styled(Button)`
  background-color: #1890ff;
  border-radius: 4px;
  border: none;
`;

const GPSTarget = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

interface NewRequestProps {
  handleFormSubmit: Function;
}

const PersonaDataForm: React.FC<NewRequestProps> = ({
  handleFormSubmit,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // geolocation
  const [geolocationAvailabe, setGeoAvailable] = useState<boolean | undefined>(
    undefined,
  );
  const [geolocationAuthorized, setGeoAuthorized] = useState<
    undefined | boolean
  >(undefined);

  const handleGetCoords = () => {
    setIsLoading(true);

    setTimeout(() => {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(
        position => {
          setIsLoading(false);
          setGeoAuthorized(true);
          const newCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(newCoords);
          // dispatch(setUserGeolocationAction(newCoords));
          // setCoordsExist(true);
        },
        GeolocationPositionError => {
          setGeoAuthorized(false);
          setIsLoading(false);
        },
      );
    }, 1000);
  };

  // useEffect(() => {
  //   setDisplayName(words(fullName)[0]);
  // }, [fullName]);
  useEffect(() => {
    if (fullName.includes(' ') && displayName === '') {
      setDisplayName(words(fullName)[0]);
    }
    // detect if browser supports geolocation
    const geoTest = 'geolocation' in navigator;
    setGeoAvailable(geoTest);
    // super important to make controlled components in Ant Design
    form.setFieldsValue({
      fullName,
      displayName,
    });
  }, [fullName, displayName, form]);

  return (
    <StyledIntro>
      <Form
        layout="vertical"
        form={form}
        onFinish={values => {
          handleFormSubmit(values);
        }}
      >
        <Description>{t('user_data_form.sub_title')}</Description>
        <Row gutter={12}>
          <Col span={24} md={12}>
            <Form.Item
              name="fullName"
              rules={[
                {
                  required: true,
                  message: t('user_data_form.full_name_error_message'),
                },
              ]}
              label={t('name')}
            >
              <Input
                style={{
                  marginRight: '15px',
                }}
                placeholder={t('full_name')}
                onChange={e => setFullName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span="24" md={12}>
            <Form.Item
              name="displayName"
              label={t('display_name')}
              rules={[
                {
                  required: true,
                  message: t('user_data_form.display_name_error_message'),
                },
              ]}
            >
              <Input
                placeholder={t('display_name_placeholder')}
                onChange={e => setDisplayName(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        {geolocationAuthorized !== false && geolocationAvailabe && (
          <GPSButton
            loading={isLoading}
            icon={<GPSTarget src={gpstarget} />}
            type="primary"
            onClick={handleGetCoords}
          >
            Use GPS to get my address
          </GPSButton>
        )}
        {geolocationAuthorized === false && (
          <div>Geolocation not authorized</div>
        )}
        <Form.Item
          name="address1"
          rules={[
            {
              required: true,
              message: t('user_data_form.address_error_message'),
            },
          ]}
          label={t('address')}
        >
          <Input placeholder={t('address1')} />
        </Form.Item>
        <Form.Item
          name="address2"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder={t('address2')} />
        </Form.Item>
        <Row gutter={12}>
          <Col span={24} md={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: t('user_data_form.address_error_message'),
                },
              ]}
            >
              <Input
                style={{
                  marginRight: '15px',
                }}
                placeholder={t('city')}
              />
            </Form.Item>
          </Col>
          <Col span={12} md={6} sm={12} xs={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: t('user_data_form.address_error_message'),
                },
              ]}
            >
              <Input
                style={{
                  marginRight: '15px',
                }}
                placeholder={t('code')}
              />
            </Form.Item>
          </Col>
          <Col span={12} md={6} sm={12} xs={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: t('user_data_form.address_error_message'),
                },
              ]}
            >
              <Input placeholder={t('country')} />
            </Form.Item>
          </Col>
        </Row>
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
          valuePropName="checked"
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

export default PersonaDataForm;
