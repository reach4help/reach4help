import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import styled from 'styled-components';

import { COLORS } from '../../../../theme/colors';
import MyLocationIcon from '../../assets/gpslocation.svg';
import SearchIcon from '../../assets/search.svg';
import { RequestInput } from './RequestReview';

const { Option } = Select;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 16px;
`;

const FormDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const CharacterLimitDiv = styled.div`
  font-size: 12px;
  margin-bottom: 24px;
`;

const StyledForm = styled(Form)`
  width: 100%;
  margin-top: 16px;
  .ant-form-item-label {
    line-height: 14px;
  }
  label {
    height: 14px;
    font-size: 12px;
  }
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
`;

const SubmitButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${COLORS.secondary};
  color: ${COLORS.white};
`;

export const REQUEST_TYPES = {
  Deliveries: 'Deliveries',
  Other: 'Other',
};

const NewRequest: React.FC<NewRequestProps> = ({
  onSubmit,
  request,
  setStreetAddress,
  setMapAddress,
  setMyLocation,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [showOtherField, setShowOtherField] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({
      streetAddress: request.streetAddress,
      type: request.type || 'Deliveries',
      body: request.description || '',
      other: request.other || '',
    });
    setShowOtherField(form.getFieldValue('type') === 'Other');
  }, [form, request]);

  const toggleOtherField = (value: string) => {
    setShowOtherField(value === 'Other');
  };

  const mayBeOtherField = () => {
    if (!showOtherField) {
      return null;
    }
    return (
      <Form.Item
        name="other"
        rules={[
          {
            required: form.getFieldValue('type') === 'Other',
            message: t('newRequest.form.other_error_message'),
          },
        ]}
      >
        <Input placeholder={t('newRequest.form.other')} />
      </Form.Item>
    );
  };

  const FormContent = (
    <MainDiv>
      <FormDiv>
        <TitleWithAddon alignAddon="left" level={3} left="0%" transform="none">
          {t('newRequest.title')}
        </TitleWithAddon>

        {/* There is a bug with types regarding onFinish - apparently an issue with @types and antd types
        https://github.com/ant-design/ant-design/pull/21067 - If it's not please fix *.* */}
        <StyledForm
          layout="vertical"
          form={form}
          onFinish={values => {
            onSubmit(
              values.type,
              values.body,
              values.streetAddress,
              values.other,
            );
          }}
        >
          <Row justify="space-between" align="middle">
            <Col span={18}>
              <StyledFormItem
                name="streetAddress"
                label={t('newRequest.form.address')}
                rules={[
                  {
                    required: true,
                    message: t('newRequest.form.address_error_message'),
                  },
                ]}
              >
                <Input onChange={e => setStreetAddress(e.target.value)} />
              </StyledFormItem>
            </Col>
            <Col span={5}>
              <Row justify="space-between" align="stretch">
                <div style={{ display: 'inline-flex' }}>
                  <div
                    style={{
                      padding: '5px',
                      flex: 'left',
                      border: '1px dotted black',
                      borderRadius: '17%',
                    }}
                    onClick={() => setMapAddress(request.streetAddress)}
                  >
                    <img
                      src={SearchIcon}
                      height="24px"
                      width="24px"
                      alt="Search for location"
                    />
                  </div>
                  <div
                    onClick={() => setMyLocation()}
                    style={{
                      flex: 'right',
                      padding: '5px',
                      border: '1px dotted black',
                      borderRadius: '17%',
                    }}
                  >
                    <img
                      src={MyLocationIcon}
                      height="24px"
                      width="24px"
                      alt="Use my location"
                    />
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
          <Form.Item
            name="type"
            label={t('newRequest.form.type')}
            rules={[
              {
                required: true,
                message: t('newRequest.form.type_error_message'),
              },
            ]}
          >
            <Select onChange={toggleOtherField}>
              {Object.keys(REQUEST_TYPES).map(key => (
                <Option value={key} key={key}>
                  {' '}
                  {REQUEST_TYPES[key]}{' '}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {mayBeOtherField()}
          <StyledFormItem
            name="body"
            label={t('newRequest.form.body')}
            rules={[
              {
                required: true,
                message: t('newRequest.form.body_error_message'),
              },
            ]}
          >
            <Input.TextArea
              placeholder={t('newRequest.form.body')}
              maxLength={500}
            />
          </StyledFormItem>
          <CharacterLimitDiv>500 Character Limit</CharacterLimitDiv>
          <Row>
            <Col span={24}>
              <SubmitButton htmlType="submit">
                {t('newRequest.form.submit')}
              </SubmitButton>
            </Col>
          </Row>
        </StyledForm>
      </FormDiv>
    </MainDiv>
  );

  return <>{FormContent}</>;
};

interface NewRequestProps {
  onSubmit: Function;
  request: RequestInput;
  setStreetAddress: (string: string) => void;
  setMapAddress: (string: string) => void;
  setMyLocation: () => void;
}

export default NewRequest;
