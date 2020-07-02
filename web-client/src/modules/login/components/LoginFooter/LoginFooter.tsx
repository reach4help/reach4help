import React from 'react';
import { useTranslation } from 'react-i18next';
import CONSTANTS from 'src/constants';
import { DEVICE_MIN } from 'src/constants/mediaQueries';
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

  @media ${DEVICE_MIN.mobileS} {
    margin: 25px auto 0px -55px;
  }
  @media ${DEVICE_MIN.tablet} {
    margin: 25px auto 0 auto;
  }
`;

export default RegistrationFooter;
