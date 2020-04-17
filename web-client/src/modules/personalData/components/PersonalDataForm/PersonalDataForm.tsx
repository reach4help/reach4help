import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Typography,
} from 'antd';
import GoogleMapReact from 'google-map-react';
import words from 'lodash/words';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from 'src/store';
import styled from 'styled-components';

import geolocationinactive from '../../../../assets/geolocationinactive.svg';
import gpstarget from '../../../../assets/gpstarget.svg';
import { ConsoleSqlOutlined } from '@ant-design/icons';

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

interface ICoords {
  lat: number;
  lng: number;
}

interface IPersonalData {
  fullName?: string;
  displayName?: string;
  address1?: string;
  address2?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  coords?: ICoords;
}

let Geocoder;

const PersonaDataForm: React.FC<NewRequestProps> = ({
  handleFormSubmit,
}): React.ReactElement => {
  const { t } = useTranslation();
  const user = useSelector((state: AppState) => state.auth.user);
  const [form] = Form.useForm();
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(false);

  // geolocation
  const [address1, setAddress1] = useState<string | undefined>('');
  const [address2, setAddress2] = useState<string | undefined>('');
  const [city, setCity] = useState<string | undefined>('');
  const [cityState, setCityState] = useState<string | undefined>('');
  const [postalCode, setPostalCode] = useState<string | undefined>('');
  const [country, setCountry] = useState<string | undefined>('');
  const [coords, setCoords] = useState<ICoords | undefined>(undefined);

  const [geolocationAvailabe, setGeoAvailable] = useState<boolean | undefined>(
    undefined,
  );
  const [geolocationAuthorized, setGeoAuthorized] = useState<
    undefined | boolean
  >(undefined);

  const initGeocoder = ({ maps }) => {
    if (typeof Geocoder === 'undefined') {
      Geocoder = new maps.Geocoder();
    }
  };

  const handleGetCoords = () => {
    setIsLoading(true);

    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(
      position => {
        setIsLoading(false);
        setGeoAuthorized(true);
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoords(location);
        Geocoder.geocode({ location }, (results, status) => {
          if (status === 'OK') {
            for (let i = 0; i < results[0].address_components.length; i++) {
              const item = results[0].address_components[i];
              const v = item.types[0];
              if (typeof v !== 'undefined') {
                switch (v) {
                  case 'street_number':
                    setAddress2(item.short_name);
                    break;
                  case 'route':
                    setAddress1(item.short_name);
                    break;
                  case 'locality':
                    setCity(item.short_name);
                    break;
                  case 'administrative_area_level_1':
                    setCityState(item.short_name);
                    break;
                  case 'country':
                    setCountry(item.long_name);
                    break;
                  case 'postal_code':
                    setPostalCode(item.short_name);
                    break;
                  default:
                    break;
                }
              }
            }
          }
        });
        // dispatch(setUserGeolocationAction(location));
        // setCoordsExist(true);
      },
      GeolocationPositionError => {
        setModalVisible(true);
        setGeoAuthorized(false);
        setIsLoading(false);
      },
    );
  };

  const onSubmitForm = () => {
    const newAddress: IPersonalData = {};
    newAddress.fullName = fullName;
    newAddress.displayName = displayName;
    newAddress.coords = coords;
    newAddress.address1 = address1;
    newAddress.address2 = address2;
    newAddress.postalCode = postalCode;
    newAddress.city = city;
    newAddress.state = cityState;
    newAddress.country = country;

    if (!geolocationAuthorized) {
      const address = `${address1},${address2},${city},${cityState},${postalCode},${country}`;
      Geocoder.geocode({ address }, (results, status) => {
        console.log(
          results[0].geometry.location.lat() + ',',
          results[0].geometry.location.lng(),
        );
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        setCoords({ lat, lng });
        console.log('going to submit now :\n', newAddress);
      });
    } else {
      console.log('going to submit now :\n', newAddress);
    }
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
      {photo !== '' && <ProfilePhoto src={photo} />}
      <Title>{t('user_data_form.sub_title')}</Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={() => {
          onSubmitForm();
          // handleFormSubmit(values);
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
              </>
            )}
            {geolocationAuthorized === false && (
              <Button
                icon={<GPSTarget src={gpstarget} />}
                type="danger"
                onClick={handleGetCoords}
              >
                Geolocation unavailable. Retry.
              </Button>
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
          <Input
            placeholder={t('address1')}
            onChange={e => setAddress1(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="address2"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input
            placeholder={t('address2')}
            onChange={e => setAddress2(e.target.value)}
          />
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
                onChange={e => setCity(e.target.value)}
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
                onChange={e => setPostalCode(e.target.value)}
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
              <Input
                placeholder={t('country')}
                onChange={e => setCountry(e.target.value)}
              />
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
          <StyledButton type="primary" htmlType="submit">
            {t('continue')}
          </StyledButton>
        </Form.Item>
      </Form>
      <Modal
        closable={false}
        style={{ top: 10 }}
        title=""
        visible={modalVisible}
        footer={[
          <Fragment key="footer1">
            {!instructionsVisible && (
              <Button
                type="primary"
                key="back"
                onClick={() => {
                  setInstructionsVisible(true);
                }}
              >
                Learn how to reactivate geolocation
              </Button>
            )}
            {instructionsVisible && (
              <Button
                type="primary"
                key="back"
                onClick={() => {
                  setInstructionsVisible(false);
                  setModalVisible(false);
                  handleGetCoords();
                }}
              >
                Retry Geolocation
              </Button>
            )}
          </Fragment>,
          <Fragment key="footer2">
            {!instructionsVisible && (
              <Button
                type="primary"
                key="back"
                onClick={() => {
                  setModalVisible(false);
                }}
              >
                Continue without Geolocation
              </Button>
            )}
            {instructionsVisible && (
              <Button
                type="primary"
                key="back"
                onClick={() => {
                  setInstructionsVisible(false);
                }}
              >
                Go Back
              </Button>
            )}
          </Fragment>,
        ]}
      >
        {!instructionsVisible && (
          <>
            <div style={{ textAlign: 'center', marginTop: '-20px' }}>
              <img alt="Geolocation Inactive" src={geolocationinactive} />
            </div>
            <h4 style={{ marginBottom: '20px' }}>
              Geolocation is not authorized
            </h4>
            <p>
              You can add your location manually, but it would help us get your
              position more accurately if you would use Geolocation. Please
              choose one of the options below :
            </p>
          </>
        )}
        {instructionsVisible && (
          <>
            <h4>Instructions:</h4>
            <p>
              You can add your location manually, but it would help us get your
              position more accurately if you used Geolocation. If you wish to
              re-activate it, please follow the link :
            </p>
            <p>
              You can add your location manually, but it would help us get your
              position more accurately if you used Geolocation. If you wish to
              re-activate it, please follow the link :
            </p>
            <p>
              You can add your location manually, but it would help us get your
              position more accurately if you used Geolocation. If you wish to
              re-activate it, please follow the link :
            </p>
            <p>
              You can add your location manually, but it would help us get your
              position more accurately if you used Geolocation. If you wish to
              re-activate it, please follow the link :
            </p>
          </>
        )}
      </Modal>
    </StyledIntro>
  );
};

export default PersonaDataForm;
