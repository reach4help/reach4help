import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TitleWithUnderline from 'src/components/TitleWithUnderline/TitleWithUnderline';
import {
  ButtonsContainer,
  DisplayButton,
} from 'src/modules/create/components/DisplayElements';
import styled from 'styled-components';

const PostDetails: React.FC<PostDetailsProps> = ({
  setPostDetails,
  postDetails,
  postTypes,
  nextHandler,
  prevHandler,
  postTypePrefix,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { Option } = Select;

  const { title, type, description, customType } = postDetails;
  const [showCustomType, setShowCustomType] = useState(type === 'customType');
  const toggleCustomType = (value: string) => {
    setShowCustomType(value === 'customType');
  };

  return (
    <>
      <TitleWithUnderline level={2}>
        {postTypePrefix} {t('modules.create.stepTitles.details')}
      </TitleWithUnderline>
      <Form
        layout="vertical"
        form={form}
        onFinish={values => {
          setPostDetails({ ...values, type: values.customType || values.type });
          nextHandler();
        }}
        initialValues={{ title, type, description, customType }}
      >
        <FormElements>
          <Form.Item
            label={t('modules.create.postDetails.titleLabel')}
            name="title"
            rules={[
              {
                required: true,
                message: t('newRequest.form.title_error_message'),
              },
            ]}
          >
            <Input
              placeholder={t('modules.create.defaults.postDetails.title')}
            />
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
                  message: t('newRequest.form.type_error_message'),
                },
              ]}
            >
              <Input placeholder={t('newRequest.form.other')} />
            </Form.Item>
          )}

          <FormItemWithAddon
            name="description"
            label={t('newRequest.form.body')}
            rules={[
              {
                required: true,
                message: t('newRequest.form.body_error_message'),
              },
            ]}
          >
            <Input.TextArea
              placeholder={t('modules.create.defaults.postDetails.body')}
              maxLength={500}
              autoSize={{ minRows: 6, maxRows: 8 }}
            />
          </FormItemWithAddon>
          <CharacterLimitDiv>500 Character Limit</CharacterLimitDiv>
        </FormElements>
        <ButtonsContainer>
          <DisplayButton
            type="default"
            block
            onClick={prevHandler}
            icon={<CloseOutlined />}
          >
            {t('cancel')}
          </DisplayButton>

          <DisplayButton
            type="primary"
            block
            icon={<ArrowRightOutlined />}
            htmlType="submit"
          >
            {t('next')}
          </DisplayButton>
        </ButtonsContainer>
      </Form>
    </>
  );
};

const FormElements = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;

  .ant-form-item-label {
    line-height: 14px;
  }
  label {
    height: 14px;
    font-size: 12px;
  }
`;

const FormItemWithAddon = styled(Form.Item)`
  margin-bottom: 5px !important;
`;

const CharacterLimitDiv = styled.div`
  font-size: 12px;
`;

interface PostDetailsProps {
  nextHandler: () => void;
  setPostDetails: (values: any) => void;
  postTypes: string[];
  postDetails: any;
  prevHandler: () => void;
  postTypePrefix: string;
}

export default PostDetails;
