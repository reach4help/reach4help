import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import GoogleLogo from './googleLogo.svg';

const GoogleButton = (props: any) => {
  const { onClick } = props;
  const { t } = useTranslation();

  return (
    <Button
      type="default"
      onClick={onClick}
      block
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '8px',
        boxShadow: '1px 1px silver',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
    >
      <img src={GoogleLogo} alt="Google Logo" width="22px" height="22px" />
      <b>{t('login.googleButtonLabel')}</b>
    </Button>
  );
};

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onAuthenticate,
}): React.ReactElement => (
  <>
    <GoogleButton onClick={onAuthenticate} />
  </>
);

interface GoogleLoginButtonProps {
  onAuthenticate: Function;
}

export default GoogleLoginButton;
