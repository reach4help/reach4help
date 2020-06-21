import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Step0: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <StepWrapper>
      <p>
        <H6>{t('login.steps.2_explanation.purpose')}</H6>
      </p>

      <p>
        <H6>{t('login.steps.2_explanation.connect')}</H6>
      </p>
    </StepWrapper>
  );
};

const StepWrapper = styled('div')`
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
`;

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
