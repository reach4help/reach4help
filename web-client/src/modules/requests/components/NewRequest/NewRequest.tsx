import { HomeOutlined } from '@ant-design/icons';
import { Button, Col, Descriptions, Form, Input, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import styled from 'styled-components';

import gpstarget from '../../../../assets/gpstarget.svg';

const { Option } = Select;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px;
`;

const FormDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const GPSTarget = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const REQUEST_TYPES = {
  medicine: 'Medicine',
  groceries: 'Groceries',
  petwalking: 'Pet walking',
};

const NewRequest: React.FC<NewRequestProps> = ({
  onSubmit,
  onCancel,
  streetAddress,
  setStreetAddress,
  setMapAddress,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      address: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
      title: 'medicine',
    });
  }, [form]);

  const FormContent = (
    <MainDiv>
      <FormDiv>
        <TitleWithAddon alignAddon="left" level={3} align="left">
          {t('newRequest.title')}
        </TitleWithAddon>

        <Descriptions>
          <Descriptions.Item>
            <HomeOutlined
              style={{
                paddingRight: '5px',
                paddingTop: '5px',
                fontSize: '1rem',
              }}
            />
            <input
              value={streetAddress}
              onChange={e => setStreetAddress(e.target.value)}
            />
            <button onClick={() => setMapAddress(streetAddress)}>
              find new address
            </button>
          </Descriptions.Item>
        </Descriptions>

        {/* There is a bug with types regarding onFinish - apparently an issue with @types and antd types
        https://github.com/ant-design/ant-design/pull/21067 - If it's not please fix *.* */}
        <StyledForm
          layout="vertical"
          form={form}
          onFinish={values => {
            onSubmit(values.title, values.body, values.address);
          }}
        >
          <Row justify="space-between" align="bottom" gutter={16}>
            <Col span={22}>
              <Form.Item
                name="address"
                label={t('newRequest.form.address')}
                rules={[
                  {
                    required: true,
                    message: t('newRequest.form.address_error_message'),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item>
                <Button
                  icon={<GPSTarget src={gpstarget} />}
                  danger
                  onClick={() => 'test'}
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
          <Form.Item
            name="body"
            label={t('newRequest.form.body')}
            rules={[
              {
                required: true,
                message: t('newRequest.form.body_error_message'),
              },
            ]}
          >
            <Input.TextArea placeholder={t('newRequest.form.body')} />
          </Form.Item>
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
  streetAddress: string;
  setStreetAddress: (string) => void;
  setMapAddress: (string) => void;
}

export default NewRequest;
