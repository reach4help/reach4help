import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import GoogleMapReact from 'google-map-react';
import words from 'lodash/words';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from 'src/store';
import styled from 'styled-components';

import gpstarget from '../../../../assets/gpstarget.svg';

const { Text } = Typography;

const ProfilePhoto = styled.img`
  border-radius: 4px;
  margin: 5px 0 20px 0;
  width: 60px;
  height: 60px;
`;

const Title = styled.h1`
  font-size: 22px;
  text-align: center;
`;

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Info = styled(Text)`
  color: #ddd;
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
`;

const GeoWarning = styled.div``;

const Map = styled.div`
  height: 0;
`;

const GPSTarget = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

interface NewRequestProps {
  handleFormSubmit: Function;
}

interface Address {
  address1: string;
  address2: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
}

const PersonaDataForm: React.FC<NewRequestProps> = ({
  handleFormSubmit,
}): React.ReactElement => {
  const { t } = useTranslation();
  const user = useSelector((state: AppState) => state.auth.user);
  const [form] = Form.useForm();
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // geolocation
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [cityState, setCityState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [geolocationAvailabe, setGeoAvailable] = useState<boolean | undefined>(
    undefined,
  );
  const [geolocationAuthorized, setGeoAuthorized] = useState<
    undefined | boolean
  >(undefined);

  let Geocoder;
  const initGeocoder = ({ maps }) => {
    Geocoder = new maps.Geocoder();
  };

  const handleGetCoords = () => {
    setIsLoading(true);

    setTimeout(() => {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(
        position => {
          setIsLoading(false);
          setGeoAuthorized(true);
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          Geocoder.geocode({ location }, (results, status) => {
            if (status === 'OK') {
              const newAddress: Address = {
                address1: '',
                address2: '',
                streetNumber: '',
                postalCode: '',
                city: '',
                state: '',
                country: '',
              };
              for (let i = 0; i < results[0].address_components.length; i++) {
                const item = results[0].address_components[i];
                const v = item.types[0];
                if (typeof v !== 'undefined') {
                  switch (v) {
                    case 'street_number':
                      newAddress.streetNumber = item.short_name;
                      setAddress2(newAddress.streetNumber);
                      break;
                    case 'route':
                      newAddress.address1 = item.short_name;
                      setAddress1(newAddress.address1);
                      break;
                    case 'locality':
                      newAddress.city = item.short_name;
                      setCity(newAddress.city);
                      break;
                    case 'administrative_area_level_1':
                      newAddress.state = item.short_name;
                      setCityState(newAddress.state);
                      break;
                    case 'country':
                      newAddress.country = item.long_name;
                      setCountry(newAddress.country);
                      break;
                    case 'postal_code':
                      newAddress.postalCode = item.short_name;
                      setPostalCode(newAddress.postalCode);
                      break;
                    default:
                      break;
                  }
                }
              }
            }
          });
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
      address1,
      address2,
      city,
      postalCode,
      country,
    });
  }, [
    fullName,
    displayName,
    address1,
    address2,
    city,
    postalCode,
    country,
    form,
  ]);

  const photo = user && user.photoURL ? String(user.photoURL) : '';

  return (
    <StyledIntro className="withContentPaddingDesktop">
      {photo !== '' && <ProfilePhoto src={photo} />}
      <Title>{t('user_data_form.sub_title')}</Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={values => {
          handleFormSubmit(values);
        }}
      >
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
        <Row>
          <Col span="24" style={{ textAlign: 'center' }}>
            {geolocationAuthorized !== false && geolocationAvailabe && (
              <>
                <Button
                  loading={isLoading}
                  icon={<GPSTarget src={gpstarget} />}
                  type="primary"
                  onClick={handleGetCoords}
                >
                  Use GPS to get my address
                </Button>
                <Map>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: `${process.env.REACT_APP_GMAPS_API_KEY}`,
                    }}
                    defaultCenter={{
                      lat: 59.95,
                      lng: 30.33,
                    }}
                    defaultZoom={11}
                    onGoogleApiLoaded={initGeocoder}
                  />
                </Map>
              </>
            )}
            {geolocationAuthorized === false && (
              <GeoWarning>Geolocation unavailable.</GeoWarning>
            )}
          </Col>
        </Row>
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
              name="city"
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
              name="postalCode"
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
              name="country"
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
        <Form.Item style={{ textAlign: 'center' }}>
          <StyledButton htmlType="submit" type="primary">
            {t('continue')}
          </StyledButton>
        </Form.Item>
      </Form>
    </StyledIntro>
  );
};

export default PersonaDataForm;
