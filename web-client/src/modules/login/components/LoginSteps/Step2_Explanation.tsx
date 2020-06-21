import React from 'react';
import { useTranslation } from 'react-i18next';
import * as i18n from 'i18next';
import langs from 'langs';
import { Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

const Step0: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  const allLanguages = langs.all();
  const currentLanguage = 'English';
  return (
    <StepWrapper>
      <InfoWrapper>
        <H6>
          {t('login.steps.2_explanation.purpose')}
          <br />
          {t('login.steps.2_explanation.connect')}
        </H6>
      </InfoWrapper>
    </StepWrapper>
  );
};

const StepWrapper = styled('div')`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
`;

const InfoWrapper = styled('div')``;

/* TODO: src/components/figma should be common library */
const H6 = styled.div`
  /* h6 */

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  /* or 144% */

  text-align: center;
`;

export default Step0;
