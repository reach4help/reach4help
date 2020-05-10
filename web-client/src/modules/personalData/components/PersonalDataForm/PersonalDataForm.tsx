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
import { firestore } from 'firebase';
import words from 'lodash/words';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { User } from 'src/models/users';
import {
  IUserAddress,
  PrivilegedUserInformation,
} from 'src/models/users/privilegedInformation';
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

interface PersonalDataFormProps {
  Geocoder: any;
  handleFormSubmit: Function;
  user: firebase.User | null | undefined;
  profile: User | undefined;
  privilegedInfo: PrivilegedUserInformation | undefined;
}

export interface IPersonalData {
  fullName?: string | null;
  displayName?: string | null;
  displayPic?: string | null;
  termsAndPrivacyAccepted?: Date;
  address: IUserAddress;
}

const PersonalDataForm: React.FC<PersonalDataFormProps> = ({
  Geocoder,
  handleFormSubmit,
  user,
  profile,
  privilegedInfo,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [userDataSet, setUserDataSet] = useState<boolean>(false);
  const [profileDataSet, setProfileDataSet] = useState<boolean>(false);
  const [privilegedInfoSet, setPrivilegedInfoSet] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string | undefined | null>(
    undefined,
  );
  const [displayName, setDisplayName] = useState<string | undefined | null>(
    undefined,
  );
  const [displayPic, setDisplayPic] = useState<string | undefined | null>(
    undefined,
  );
  const [tempDisplayPic, setTempDisplayPic] = useState<
    string | undefined | null
  >(undefined);
  const [acceptToUsePhoto, setAcceptToUsePhoto] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(false);
  const [termsAndPrivacyAccepted, setTermsAndPrivacyAccepted] = useState<
    Date | undefined
  >(undefined);

  // geolocation
  const [address1, setAddress1] = useState<string | undefined>(undefined);
  const [address2, setAddress2] = useState<string | undefined>(undefined);
  const [city, setCity] = useState<string | undefined>(undefined);
  const [cityState, setCityState] = useState<string | undefined>(undefined);
  const [postalCode, setPostalCode] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [coords, setCoords] = useState<firebase.firestore.GeoPoint | undefined>(
    undefined,
  );

  const [geolocationAvailable, setGeoAvailable] = useState<boolean | undefined>(
    undefined,
  );
  const [geolocationAuthorized, setGeoAuthorized] = useState<
    undefined | boolean
  >(undefined);

  const parseAddressComponents = addressComponents => {
    let streetNumber = '';
    let route = '';

    for (let i = 0; i < addressComponents.length; i++) {
      const item = addressComponents[i];
      const v = item.types[0];

      if (typeof v !== 'undefined') {
        switch (v) {
          // Save `street_number` and `route` components to interpolate them into `address1` at the end
          case 'street_number':
            streetNumber = item.short_name;
            break;
          case 'route':
            route = item.short_name;
            break;
          case 'locality':
            setCity(item.short_name);
            break;
          case 'administrative_area_level_1':
            setCityState(item.long_name);
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

    // Interpolate these together into `address1`
    if (streetNumber && route) {
      setAddress1(`${streetNumber} ${route}`);
    } else if (streetNumber) {
      setAddress1(`${streetNumber}`);
    } else if (route) {
      setAddress1(`${route}`);
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
        setCoords(new firestore.GeoPoint(location.lat, location.lng));
        Geocoder.geocode({ location }, (results, status) => {
          if (status === 'OK') {
            parseAddressComponents(results[0].address_components);
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

  useEffect(() => {
    if (!userDataSet && user && user.email) {
      if (acceptToUsePhoto) {
        setDisplayPic(user.photoURL);
      }
      setUserDataSet(true);
      setTempDisplayPic(user.photoURL);
      setDisplayName(user.displayName);
      setFullName(user.displayName);
    }
    if (!profileDataSet && profile && profile.displayName) {
      setProfileDataSet(true);
      if (profile.displayName) {
        setDisplayName(profile.displayName);
      }
      if (profile.displayPicture) {
        if (acceptToUsePhoto) {
          setDisplayPic(profile.displayPicture);
        }
        setTempDisplayPic(profile.displayPicture);
      } else {
        setAcceptToUsePhoto(false);
      }
      if (profile.displayName) {
        setDisplayName(profile.displayName);
        setFullName(profile.displayName);
      }
    }
    if (!privilegedInfoSet && privilegedInfo && privilegedInfo.address) {
      setPrivilegedInfoSet(true);
      const addressToSet = privilegedInfo.address;
      if (addressToSet.address1) {
        setAddress1(addressToSet.address1);
      }
      if (addressToSet.address2) {
        setAddress2(addressToSet.address2);
      }
      if (addressToSet.postalCode) {
        setPostalCode(addressToSet.postalCode);
      }
      if (addressToSet.city) {
        setCity(addressToSet.city);
      }
      if (addressToSet.state) {
        setCityState(addressToSet.state);
      }
      if (addressToSet.country) {
        setCountry(addressToSet.country);
      }
      if (addressToSet.coords) {
        setCoords(addressToSet.coords);
      }
    }
  }, [
    user,
    profile,
    privilegedInfo,
    acceptToUsePhoto,
    privilegedInfoSet,
    profileDataSet,
    userDataSet,
  ]);

  useEffect(() => {
    if (acceptToUsePhoto) {
      if (tempDisplayPic) {
        setDisplayPic(tempDisplayPic);
      }
    } else {
      setDisplayPic(undefined);
    }
  }, [acceptToUsePhoto, tempDisplayPic]);

  const onSubmitForm = () => {
    const newAddress: IUserAddress = {
      address1,
      address2,
      postalCode,
      city,
      state: cityState,
      country,
      coords,
    };
    const newPersonalInfo: IPersonalData = {
      fullName,
      displayName,
      displayPic,
      termsAndPrivacyAccepted,
      address: newAddress,
    };
    handleFormSubmit(newPersonalInfo);
  };

  useEffect(() => {
    if (fullName && fullName.includes(' ') && displayName === '') {
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
      cityState,
      city,
      postalCode,
      country,
    });
  }, [
    fullName,
    displayName,
    address1,
    address2,
    cityState,
    city,
    postalCode,
    country,
    form,
  ]);

  return (
    <StyledIntro className="withContentPaddingDesktop">
      {displayPic && <ProfilePhoto src={displayPic} />}
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
            {geolocationAuthorized !== false && geolocationAvailable && (
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
                type="primary"
                danger
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
          <Col span={12} md={6} sm={12} xs={24}>
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
              name="cityState"
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
                placeholder={t('State')}
                onChange={e => setCityState(e.target.value)}
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
        <Form.Item style={{ textAlign: 'center' }} name="useProfilePic">
          <Checkbox
            checked={acceptToUsePhoto}
            onChange={({ target }) => setAcceptToUsePhoto(target.checked)}
          >
            {t('user_data_form.accept_to_use_profile_pic')}
          </Checkbox>
        </Form.Item>
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
          <Checkbox
            onChange={({ target }) =>
              target.checked
                ? setTermsAndPrivacyAccepted(new Date())
                : setTermsAndPrivacyAccepted(undefined)
            }
          >
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
