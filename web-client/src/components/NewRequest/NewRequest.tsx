import { Button, Descriptions, Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import TitleWithAddon from "../TitleWithAddon/TitleWithAddon";

const MainDiv = styled.div`
  display: flex;
`;

const IconDiv = styled.div`
  width: 25%;
  padding-right: 24px;
`;

const IconImage = styled.img`
  width: 100%;
`;

const FormDiv = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

interface NewRequestProps {
  handleFormSubmit: Function;
}

const NewRequest: React.FC<NewRequestProps> = ({
  handleFormSubmit
}): React.ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <MainDiv>
      <IconDiv>
        {/* ATENTION!! THIS IS WRONG, JUST A HACK UNTIL I FIND SOMETHING BETTER */}
        <IconImage src="https://reach4help.org/static/logo-78d2063bcc5e542bf67195e3c6fb6fcf.svg" />
      </IconDiv>
      <FormDiv>
        <TitleWithAddon alignAddon="left" level={2}>
          {t("newRequest.title")}
        </TitleWithAddon>
        <Descriptions>
          <Descriptions.Item label="H">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
        {/* There is a bug with types regarding onFinish - apparently an issue with @types and antd types
        https://github.com/ant-design/ant-design/pull/21067 - If it's not please fix *.* */}
        <Form
          layout="vertical"
          form={form}
          onFinish={values => {
            handleFormSubmit(values);
          }}
        >
          <Form.Item name="title" label={t("newRequest.form.title")}>
            <Input placeholder={t("newRequest.form.title")} />
          </Form.Item>
          <Form.Item name="body" label={t("newRequest.form.body")}>
            <Input placeholder={t("newRequest.form.body")} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </FormDiv>
    </MainDiv>
  );
};

export default NewRequest;
