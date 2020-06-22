import React from 'react';
import { useTranslation } from 'react-i18next';
import CONSTANTS from 'src/constants';
import styled from 'styled-components';

const { supportEmail } = CONSTANTS;

const LoginFooter = () => {
  const { t } = useTranslation();

  return (
    <LoginStepsFooterWrapper>
      {t('login.steps.footer.contact')} <br />
      <a href={`mailto:${supportEmail}`}> {supportEmail} </a>
    </LoginStepsFooterWrapper>
  );
};

const LoginStepsFooterWrapper = styled.div`
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

export default LoginFooter;
