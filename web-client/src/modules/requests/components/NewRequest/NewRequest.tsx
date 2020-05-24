import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import styled from 'styled-components';

import gpslocation from '../../assets/gpslocation.svg';
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
  font-size:12px;
  margin-bottom:24px;
`;

const StyledForm = styled(Form)`
  width: 100%;
  margin-top:16px;
  .ant-form-item-label {
    line-height:14px;
  }
  label {
    height:14px;
    font-size:12px;
  }
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom:0;
`;

const GPSTarget = styled.img`
  width: 16px;
  height: 16px;
`;

const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const GPSButton = styled(Button)`
  width: 42px;
`;

export const REQUEST_TYPES = {
  medicine: 'Medicine',
  groceries: 'Groceries',
  petwalking: 'Pet walking',
};

const NewRequest: React.FC<NewRequestProps> = ({
  onSubmit,
  onCancel,
  request,
  setStreetAddress,
  setMapAddress,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      streetAddress: request.streetAddress,
      title: request.title || 'medicine',
      body: request.description || '',
    });
  }, [form, request]);

  const FormContent = (
    <MainDiv>
      <FormDiv>
        <TitleWithAddon alignAddon="left" level={3} align="left">
          {t('newRequest.title')}
        </TitleWithAddon>

        {/* There is a bug with types regarding onFinish - apparently an issue with @types and antd types
        https://github.com/ant-design/ant-design/pull/21067 - If it's not please fix *.* */}
        <StyledForm
          layout="vertical"
          form={form}
          onFinish={values => {
            onSubmit(values.title, values.body, values.streetAddress);
          }}
        >
          <Row justify="space-between" align="bottom" gutter={12}>
            <Col span={22}>
              <Form.Item
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
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item>
                <GPSButton
                  icon={<GPSTarget src={gpslocation} />}
                  onClick={() => setMapAddress(request.streetAddress)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="title"
            label={t('newRequest.form.type')}
            rules={[
              {
                required: true,
                message: t('newRequest.form.type_error_message'),
              },
            ]}
          >
            <Select>
              {Object.keys(REQUEST_TYPES).map(key => (
                <Option value={key} key={key}>
                  {' '}
                  {REQUEST_TYPES[key]}{' '}
                </Option>
              ))}
            </Select>
          </Form.Item>
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
            <Input.TextArea placeholder={t('newRequest.form.body')} maxLength={150} />
          </StyledFormItem>
          <CharacterLimitDiv>150 Character Limit</CharacterLimitDiv>
          <Row>
            <Col span={11}>
              <StyledButton onClick={() => onCancel()}>
                {t('newRequest.form.cancel')}
              </StyledButton>
            </Col>
            <Col span={11} offset={2}>
              <StyledButton htmlType="submit" type="primary">
                {t('newRequest.form.submit')}
              </StyledButton>
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
  onCancel: Function;
  request: RequestInput;
  setStreetAddress: (string) => void;
  setMapAddress: (string) => void;
}

export default NewRequest;
