import { HomeOutlined } from '@ant-design/icons';
import { Button, Col, Descriptions, Form, Input, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import styled from 'styled-components';

import { DEVICE_MAX } from '../../../../constants/mediaQueries';
import { COLORS } from '../../../../theme/colors';

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

const ConsentAndSubmitDiv = styled.div`
  display: block;
  text-align: left;
`;

const SubmitButton = styled(Button)`
  background-color: ${COLORS.secondary};
  border-color: ${COLORS.secondary};
  :hover {
    background-color: ${COLORS.secondaryHover};
    border-color: ${COLORS.secondaryHover};
  }
  :focus {
    background-color: ${COLORS.secondaryHover};
    border-color: ${COLORS.secondaryHover};
  }
  @media ${DEVICE_MAX.tablet} {
    height: 3.2em;
    background-color: ${COLORS.secondary} !important;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const NewRequest: React.FC<NewRequestProps> = ({
  createRequest,
  onCancel,
  streetAddress,
  setStreetAddress,
  setMapAddress,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const FormContent = (
    <MainDiv>
      <FormDiv>
        <TitleWithAddon alignAddon="left" level={2}>
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
            createRequest(values.title, values.body, values.consent);
          }}
        >
          <Form.Item name="title" label={t('newRequest.form.title')}>
            <Input placeholder={t('newRequest.form.title')} />
          </Form.Item>
          <Form.Item name="body" label={t('newRequest.form.body')}>
            <Input.TextArea placeholder={t('newRequest.form.body')} />
          </Form.Item>
          <ConsentAndSubmitDiv>
            <Row>
              <Col span={11}>
                <StyledButton onClick={() => onCancel()}>
                  {t('newRequest.form.cancel')}
                </StyledButton>
              </Col>
              <Col span={11} offset={2}>
                <SubmitButton htmlType="submit" type="primary">
                  {t('newRequest.form.submit')}
                </SubmitButton>
              </Col>
            </Row>
          </ConsentAndSubmitDiv>
        </StyledForm>
      </FormDiv>
    </MainDiv>
  );

  return <>{FormContent}</>;
};

interface NewRequestProps {
  createRequest: Function;
  onCancel: Function;
  streetAddress: string;
  setStreetAddress: (string) => void;
  setMapAddress: (string) => void;
}

export default NewRequest;
