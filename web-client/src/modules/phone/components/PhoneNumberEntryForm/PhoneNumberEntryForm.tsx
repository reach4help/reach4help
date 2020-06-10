import { Button, Form, Input, Select, Typography } from 'antd';
import PhoneNumberValidator from 'awesome-phonenumber';
import { allCountries } from 'country-telephone-data';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import firebase from 'src/firebase';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const { Text } = Typography;
const { Option } = Select;

const StyledInput = styled(Input)`
  margin-top: 1rem;
  width: 11rem;
`;

const Info = styled(Text)`
  color: ${COLORS.faded};
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
`;

interface PhoneNumberEntryFormProps {
  handleFormSubmit: Function;
  loading: boolean;
  reset: boolean;
}

const PhoneNumberEntryForm: React.FC<PhoneNumberEntryFormProps> = ({
  handleFormSubmit,
  loading,
  reset,
}): React.ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [recaptchaVerifier, setRecaptchaVerifier] = useState({});
  const [resetState, setResetState] = useState(false);

  const [digits, setDigits] = useState<string>('');
  const [dialCode, setDialCode] = useState<string>('');
  const [numberValidMessage, setNumberValidMessage] = useState<string>('');
  const [numberINValidMessage, setNumberINValidMessage] = useState<string>('');

  const fullTelephoneValidator = (value, isDigits = false) => {
    /* TODO:  Check if this conditional is needed */
    if (!value) {
      if (isDigits) {
        return Promise.reject(t('phoneNumber.error_message'));
      }
      return Promise.reject(t('phoneNumber.error_message'));
    }

    let countryCode;
    let number;
    if (isDigits) {
      countryCode = dialCode;
      number = value.replace(/\D/g, '');
    } else {
      countryCode = value;
      number = digits;
    }

    if (!countryCode) {
      setNumberINValidMessage(t('phoneNumber.no_country_error'));
      setNumberValidMessage('');
      return Promise.reject();
    }

    if (!number) {
      setNumberINValidMessage(t('phoneNumber.no_digits_error'));
      setNumberValidMessage('');
      return Promise.reject();
    }

    const fullTelephone = `+${countryCode}${number}`;

    const pnv = new PhoneNumberValidator(fullTelephone);
    if (pnv.isValid() && pnv.canBeInternationallyDialled()) {
      setNumberValidMessage(
        `${fullTelephone} ${t('phoneNumber.is_valid_number')}`,
      );
      setNumberINValidMessage('');
      return Promise.resolve();
    }
    setNumberINValidMessage(
      `${fullTelephone} ${t('phoneNumber.is_not_valid_number')}`,
    );
    setNumberValidMessage('');
    return Promise.reject();
  };

  useEffect(() => {
    const appVerifier = new firebase.auth.RecaptchaVerifier('submitButton', {
      size: 'invisible',
    });
    setRecaptchaVerifier(appVerifier);
  }, []);

  // TODO: FIND A BETTER SOLUTION TO RESET RECAPTCHA
  useEffect(() => {
    if (reset) {
      setRecaptchaVerifier({});
      setResetState(true);
    }
  }, [reset]);

  useEffect(() => {
    if (resetState) {
      setResetState(false);
      form.resetFields();
    } else if (reset) {
      const appVerifier = new firebase.auth.RecaptchaVerifier('submitButton', {
        size: 'invisible',
      });
      setRecaptchaVerifier(appVerifier);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetState]);

  if (resetState) {
    return <></>;
  }

  const ErrorDisplay = styled.div`
    color: ${COLORS.error};
    font-weight: 700;
    width: 75%;
    margin: auto;
    border: 2px solid ${COLORS.error};
    padding: 10px;
    text-align: center;
  `;
  const SuccessDisplay = styled.div`
    color: ${COLORS.green};
    font-weight: 700;
    width: 75%;
    margin: auto;
    border: 2px solid ${COLORS.green};
    padding: 10px;
    text-align: center;
  `;

  const FormLabel = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.65);
    margin-top: 5px;
  `;

  const Instructions = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 30px;
  `;

  return (
    <Form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      layout="vertical"
      form={form}
      onFinish={({ prefix, suffix }) => {
        handleFormSubmit(
          { phoneNumber: `+${prefix}${suffix.replace(/\D/g, '')}` },
          recaptchaVerifier,
        );
      }}
    >
      <Instructions>{t('phoneNumber.sub_title')}</Instructions>

      <FormLabel>{t('phoneNumber.country_label')}</FormLabel>
      <Form.Item
        name="prefix"
        rules={[
          {
            validator: (_, value) => fullTelephoneValidator(value, false),
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder={t('phoneNumber.country_placeholder')}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={v => setDialCode(v.toString())}
        >
          {/* wierd bug "United States" resolves as "United States Minor Islands */
          allCountries.map(c => (
            <Option key={c.iso2} value={c.dialCode}>
              {c.name.startsWith('United States') ? 'United States' : c.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <FormLabel>{t('phoneNumber.phone_label')}</FormLabel>
      <Form.Item
        style={{ textAlign: 'center' }}
        name="suffix"
        rules={[
          {
            validator: (_, value) => fullTelephoneValidator(value, true),
          },
        ]}
      >
        <StyledInput
          onChange={e => setDigits(e.target.value)}
          placeholder="1234567"
          maxLength={14}
        />
      </Form.Item>

      {numberINValidMessage && (
        <ErrorDisplay> {numberINValidMessage}</ErrorDisplay>
      )}

      {numberValidMessage && (
        <SuccessDisplay>{numberValidMessage}</SuccessDisplay>
      )}

      <Info>{t('phoneNumber.info')}</Info>
      <Form.Item>
        <StyledButton
          loading={loading}
          id="submitButton"
          htmlType="submit"
          type="primary"
        >
          {t('continue')}
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

export default PhoneNumberEntryForm;
