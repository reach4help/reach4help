import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const PostDetails: React.FC<PostDetailsProps> = ({
  setPostDetails,
  postDetails,
  postTypes,
  nextHandler: onNext,
  prevHandler: handleCancel,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [showCustomType, setShowCustomType] = useState(
    postDetails.type === 'customType',
  );

  const { title, type, body, customType } = postDetails;

  const toggleCustomType = (value: string) => {
    setShowCustomType(value === 'customType');
  };

  const { Option } = Select;
  return (
    <PostDetailsWrapper>
      <FormWrapper>
        <TitleWithUnderline level={2} color={COLORS.primaryDark}>
          {t('modules.create.postDetails.header')}
        </TitleWithUnderline>
        <DetailsForm
          layout="vertical"
          form={form}
          onFinish={values => {
            setPostDetails(values);
            onNext();
          }}
          initialValues={{ title, type, body, customType }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignContent: 'space-between',
            }}
          >
            <Form.Item
              label={t('modules.create.postDetails.titleLabel')}
              name="title"
              rules={[
                {
                  required: true,
                  message: t('newRequest.form.type_error_message'),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('modules.create.postDetails.typeLabel')}
              name="type"
              rules={[
                {
                  required: true,
                  message: t('newRequest.form.type_error_message'),
                },
              ]}
            >
              <Select onChange={toggleCustomType}>
                {[...postTypes, 'customType'].map(key => (
                  <Option value={key} key={key}>
                    {' '}
                    {key === 'customType' ? 'other' : key}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {showCustomType && (
              <Form.Item
                name="customType"
                rules={[
                  {
                    required: true,
                    message: t('newRequest.form.other_error_message'),
                  },
                ]}
              >
                <Input placeholder={t('newRequest.form.other')} />
              </Form.Item>
            )}

            <FormItem
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
            </FormItem>
            <CharacterLimitDiv>500 Character Limit</CharacterLimitDiv>
          </div>

          <div
            style={{
              display: 'flex',
              position: 'relative',
              marginBottom: '125px',
            }}
          >
            <Button
              type="default"
              block
              onClick={handleCancel}
              icon={<CloseOutlined />}
              style={{ marginRight: '5px', marginLeft: '5px' }}
            >
              {t('cancel')}
            </Button>

            <Button
              type="primary"
              block
              icon={<ArrowRightOutlined />}
              htmlType="submit"
              style={{ marginRight: '5px', marginLeft: '5px' }}
            >
              {t('next')}
            </Button>
          </div>
        </DetailsForm>
      </FormWrapper>
    </PostDetailsWrapper>
  );
};
const PostDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 16px;
  justify-content: space-between;
  height: 100%;
`;

const FormWrapper = styled.div`
  width: 90%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const DetailsForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-top: 15px !important;
  margin-left: 15px;
  .ant-form-item-label {
    line-height: 14px;
  }
  label {
    height: 14px;
    font-size: 12px;
  }
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 0;
`;

const CharacterLimitDiv = styled.div`
  font-size: 12px;
  margin-bottom: 24px;
`;

interface PostDetailsProps {
  nextHandler: () => void;
  setPostDetails: (values: any) => void;
  postTypes: string[];
  postDetails: any;
  prevHandler: () => void;
}

export default PostDetails;
