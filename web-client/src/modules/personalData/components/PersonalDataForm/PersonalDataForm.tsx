import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import words from 'lodash/words';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { DEVICE_MIN } from 'src/constants/mediaQueries';
import { IUserAddress } from 'src/models/users/privilegedInformation';
import { User } from 'src/models/users/User';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const { Text } = Typography;

const PersonalDataForm: React.FC<PersonalDataFormProps> = ({
  handleFormSubmit,
  user,
  profile,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [userDataSet, setUserDataSet] = useState<boolean>(false);
  const [profileDataSet, setProfileDataSet] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string | undefined | null>(
    undefined,
  );
  const [displayNickname, setDisplayName] = useState<string | undefined | null>(
    undefined,
  );
  const [displayPic, setDisplayPic] = useState<string | undefined | null>(
    undefined,
  );
  const [tempDisplayPic, setTempDisplayPic] = useState<
    string | undefined | null
  >(undefined);
  const [acceptToUsePhoto, setAcceptToUsePhoto] = useState<boolean>(true);

  const [
    termsAndPrivacyAccepted,
    setTermsAndPrivacyAccepted,
  ] = useState<Date | null>(null);

  useEffect(() => {
    if (!userDataSet && user && user.email) {
      if (acceptToUsePhoto) {
        setDisplayPic(user.photoURL);
      }
      setUserDataSet(true);
      setTempDisplayPic(user.photoURL);
      setDisplayName(user.displayNickname);
      setFullName(user.displayNickname);
    }
    if (!profileDataSet && profile && profile.displayNickname) {
      setProfileDataSet(true);
      if (profile.displayNickname) {
        setDisplayName(profile.displayNickname);
      }
      if (profile.displayPicture) {
        if (acceptToUsePhoto) {
          setDisplayPic(profile.displayPicture);
        }
        setTempDisplayPic(profile.displayPicture);
      } else {
        setAcceptToUsePhoto(false);
      }
      if (profile.displayNickname) {
        setDisplayName(profile.displayNickname);
        setFullName(profile.displayNickname);
      }
    }
  }, [user, profile, acceptToUsePhoto, profileDataSet, userDataSet]);

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
    const newPersonalInfo = {
      fullName,
      displayNickname,
      displayPic,
      termsAndPrivacyAccepted,
      address: {},
    };
    handleFormSubmit(newPersonalInfo);
  };

  useEffect(() => {
    if (fullName && fullName.includes(' ') && displayNickname === '') {
      setDisplayName(words(fullName)[0]);
    }
    // super important to make controlled components in Ant Design
    form.setFieldsValue({
      fullName,
      displayNickname,
    });
  }, [fullName, displayNickname, form]);

  return (
    <Introduction className="withContentPaddingDesktop">
      {displayPic && <ProfilePhoto src={displayPic} />}
      <Title>
        {t('modules.personal-data.components.PersonalDataForm.sub_title')}
      </Title>
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
                  message: t(
                    'modules.personal-data.components.PersonalDataForm.full_name_error_message',
                  ),
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
              name="displayNickname"
              label={t('display_name')}
              rules={[
                {
                  required: true,
                  message: t(
                    'modules.personal-data.components.PersonalDataForm.display_name_error_message',
                  ),
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
        <Information>
          {t('modules.personal-data.components.PersonalDataForm.policy_text')}{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/reach4help/reach4help/blob/master/CODE_OF_CONDUCT.md"
          >
            {t('modules.personal-data.components.PersonalDataForm.policy_link')}
          </a>
        </Information>
        <CheckboxContainer>
          <Form.Item name="useProfilePic">
            <Checkbox
              checked={acceptToUsePhoto}
              onChange={({ target }) => setAcceptToUsePhoto(target.checked)}
            >
              {t(
                'modules.personal-data.components.PersonalDataForm.accept_to_use_profile_pic',
              )}
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="terms"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : // eslint-disable-next-line prefer-promise-reject-errors
                      Promise.reject(
                        `${t(
                          'modules.personal-data.components.PersonalDataForm.terms_conditions_error',
                        )}`,
                      ),
              },
            ]}
            valuePropName="checked"
          >
            <Checkbox
              onChange={({ target }) =>
                target.checked
                  ? setTermsAndPrivacyAccepted(new Date())
                  : setTermsAndPrivacyAccepted(null)
              }
            >
              <Trans
                i18nKey="modules.personal-data.components.PersonalDataForm.terms_conditions_text"
                values={{
                  linkText: t(
                    'modules.personal-data.components.PersonalDataForm.terms_conditions_link_text',
                  ),
                }}
              >
                {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/control-has-associated-label */}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/reach4help/reach4help/blob/master/CODE_OF_CONDUCT.md"
                />
              </Trans>
            </Checkbox>
          </Form.Item>
        </CheckboxContainer>

        <Form.Item style={{ textAlign: 'center' }}>
          <PersonalDataFormButton type="primary" htmlType="submit">
            {t('continue')}
          </PersonalDataFormButton>
        </Form.Item>
      </Form>
    </Introduction>
  );
};

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

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Information = styled(Text)`
  color: ${COLORS.faded};
  text-align: center;
`;

const CheckboxContainer = styled.div`
  margin-top: 1rem;

  @media ${DEVICE_MIN.tablet} {
    text-align: center;
  }
`;

const PersonalDataFormButton = styled(Button)`
  margin-top: 20px;
`;

interface PersonalDataFormProps {
  handleFormSubmit: Function;
  user: firebase.User | null | undefined;
  profile: User | undefined;
}

export interface IPersonalData {
  fullName?: string | null;
  displayNickname?: string | null;
  displayPic?: string | null;
  termsAndPrivacyAccepted?: Date;
  address: IUserAddress;
}

// TODO: Instructions modal text needs to be completed and eventually
// do a browser detection to show the correct instructions message
export default PersonalDataForm;
