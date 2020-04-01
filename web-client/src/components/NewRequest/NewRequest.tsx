import { Button, Checkbox, Descriptions, Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { COLORS } from "../../theme/colors";
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

const StyledForm = styled(Form)`
  width: 100%;
`;

const ConsentAndSubmitDiv = styled.div`
  display: flex;
  justify-content: space-between;
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
          <Descriptions.Item label="AntdIconHere">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
        {/* There is a bug with types regarding onFinish - apparently an issue with @types and antd types
        https://github.com/ant-design/ant-design/pull/21067 - If it's not please fix *.* */}
        <StyledForm
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
            <Input.TextArea placeholder={t("newRequest.form.body")} />
          </Form.Item>
          <ConsentAndSubmitDiv>
            <Form.Item valuePropName="checked" name="consent">
              <Checkbox>{t("newRequest.form.consent")}</Checkbox>
            </Form.Item>
            <Form.Item>
              <SubmitButton htmlType="submit" type="primary">
                {t("newRequest.form.submit")}
              </SubmitButton>
            </Form.Item>
          </ConsentAndSubmitDiv>
        </StyledForm>
      </FormDiv>
    </MainDiv>
  );
};

export default NewRequest;
