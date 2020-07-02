/* Common layout patterns used by Figma */
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StepWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

const FormLabel = styled('div')`
  display: flex;
  justify-content: spa ce-around;
  text-align: center;
`;

const Explanation = styled('div')`
  display: flex;
  padding: 25px;
  max-width: 550px;
  justify-content: space-around;
  text-align: center;
`;

const LoginButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
  margin-bottom: 25px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-around;
`;

const Splitter = styled.div`
  height: 0;
  margin: 50 0;
  border: 1px solid rgba(0, 0, 0, 0.85);
  width: 38%;
`;

const OrDividerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px;
`;

const OrWordWrapper = styled.div`
  position: relative;
  bottom: 10px;
`;

const OrDivider = () => {
  const { t } = useTranslation();
  return (
    <OrDividerWrapper>
      <Splitter /> <OrWordWrapper>{t('or')}</OrWordWrapper> <Splitter />
    </OrDividerWrapper>
  );
};

export {
  ButtonWrapper,
  Explanation,
  FormLabel,
  LoginButtonsWrapper,
  LogoWrapper,
  OrDivider,
  StepWrapper,
};
