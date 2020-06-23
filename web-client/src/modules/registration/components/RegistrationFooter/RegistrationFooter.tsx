import React from 'react';
import { useTranslation } from 'react-i18next';
import CONSTANTS from 'src/constants';
import styled from 'styled-components';

const { SUPPORT_EMAIL } = CONSTANTS;

const RegistrationFooter = () => {
  const { t } = useTranslation();

  return (
    <RegistrationStepsFooterWrapper>
      {t('login.steps.footer.contact')} <br />
      <a href={`mailto:${SUPPORT_EMAIL}`}> {SUPPORT_EMAIL} </a>
    </RegistrationStepsFooterWrapper>
  );
};

const RegistrationStepsFooterWrapper = styled.div`
  position: relative;
  width: 313px;
  margin: 25px auto 0 auto;
  bottom: 0;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 150%;

  text-align: center;

  background: rgba(24, 144, 255, 0.1);
  color: rgba(0, 0, 0, 0.85);
  opacity: 0.8;
`;

export default RegistrationFooter;
