import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TitleWithOrangeUnderline from 'src/components/TitleWithOrangeUnderline/TitleWithOrangeUnderline';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const PostDetails: React.FC<PostDetailsProps> = ({
  onNext,
  setPostDetails,
  postDetails,
  handleCancel,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <MainDiv>
      <FormDiv>
        <TitleWithOrangeUnderline level={2} color={COLORS.primaryDark}>
          Post Details
        </TitleWithOrangeUnderline>
        <NewRequestForm
          layout="vertical"
          form={form}
          onFinish={values => {
            setPostDetails(values);
            onNext();
          }}
          initialValues={{
            title: postDetails.title,
            type: postDetails.type,
            body: postDetails.body,
            other: postDetails.other,
          }}
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
              label="Title"
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
              label={t('newRequest.form.type')}
              name="type"
              rules={[
                {
                  required: true,
                  message: t('newRequest.form.type_error_message'),
                },
              ]}
            >
              <Input />
            </Form.Item>
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
              Cancel
            </Button>

            <Button
              type="primary"
              block
              icon={<ArrowRightOutlined />}
              htmlType="submit"
              style={{ marginRight: '5px', marginLeft: '5px' }}
            >
              {t('newRequest.form.submit')}
            </Button>
          </div>
        </NewRequestForm>
      </FormDiv>
    </MainDiv>
  );
};
const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 16px;
  justify-content: space-between;
  height: 100%;
`;

const FormDiv = styled.div`
  width: 90%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const CharacterLimitDiv = styled.div`
  font-size: 12px;
  margin-bottom: 24px;
`;

/* 
style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
          
*/
const NewRequestForm = styled(Form)`
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

interface PostDetailsProps {
  onNext: () => void;
  setPostDetails: (values: any) => void;
  postDetails: any;
  handleCancel: () => void;
}

export default PostDetails;
