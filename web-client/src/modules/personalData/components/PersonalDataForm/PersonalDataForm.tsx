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
import words from 'lodash/words';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import geolocationinactive from '../../../../assets/geolocationinactive.svg';
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

const GPSTarget = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

interface NewRequestProps {
  Geocoder: any;
  handleFormSubmit: Function;
  user: firebase.User | null | undefined;
  profile: firebase.firestore.DocumentData | undefined;
  priviledgedInfo: firebase.firestore.DocumentData | undefined;
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
  geolocation?: boolean;
}

const PersonalDataForm: React.FC<NewRequestProps> = ({
  Geocoder,
  handleFormSubmit,
  user,
}): React.ReactElement => {
  const { t } = useTranslation();
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
        if (GeolocationPositionError) {
          // do something regarding the error
        }
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
    newAddress.geolocation = geolocationAuthorized;
    handleFormSubmit(newAddress);
  };

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
        onFinish={() => {
          onSubmitForm();
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
                  {t('user_data_form.gps_button')}
                </Button>
              </>
            )}
            {geolocationAuthorized === false && (
              <Button
                icon={<GPSTarget src={gpstarget} />}
                type="danger"
                onClick={handleGetCoords}
              >
                {t('user_data_form.gps_button')}
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
                {t('user_data_form.learn_reactivate')}
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
                {t('user_data_form.retry_geolocation')}
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
                {t('user_data_form.continue_without_geolocation')}
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
                {t('user_data_form.go_back')}
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
              {t('user_data_form.geolocation_modal_title')}
            </h4>
            <p>{t('user_data_form.geolocation_modal_text')}</p>
          </>
        )}
        {instructionsVisible && (
          <>
            <h4>{t('user_data_form.instructions_modal_title')}</h4>
            <p>{t('user_data_form.instructions_modal_text')}</p>
          </>
        )}
      </Modal>
    </StyledIntro>
  );
};
// TODO: Instructions modal text needs to be completed and eventually
// do a browser detection to show the correct instructions message
export default PersonalDataForm;
